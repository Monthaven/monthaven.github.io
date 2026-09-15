#!/usr/bin/env node
// Content quality gate.
//
//   npm run check          warns about unfilled proof placeholders, fails on
//                          thin or duplicate content
//   npm run check:launch   ALSO fails on any remaining placeholder
//
// The placeholder rule exists for one reason: no invented testimonial, case
// study, guarantee or dollar figure may ever ship. The site is buildable and
// reviewable with placeholders; it is not launchable with them.

import fs from "node:fs";
import path from "node:path";

const SITE = path.join(process.cwd(), "_site");
const STRICT = process.argv.includes("--launch");
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

if (!fs.existsSync(SITE)) {
  console.error("check-content: _site/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

const pages = walk(SITE)
  .map((f) => ({ rel: "/" + path.relative(SITE, f).split(path.sep).join("/"), file: f }))
  .filter((p) => {
    const h = fs.readFileSync(p.file, "utf8");
    return !h.includes('http-equiv="refresh"'); // skip redirect stubs
  });

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function trigrams(text) {
  const words = text.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i < words.length - 2; i++) set.add(words.slice(i, i + 3).join(" "));
  return set;
}

// Jaccard similarity: shared trigrams over the UNION, not over the smaller set.
// Dividing by the smaller set punishes a short page for sharing boilerplate with
// a long one and overstates how similar two pages actually are.
function overlap(a, b) {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  return shared / (a.size + b.size - shared);
}

// ---------------------------------------------------------------- placeholders
// Read proof.json directly. Scanning rendered HTML would miss the real problem,
// because unfilled proof is *omitted* from the page rather than printed to it.
const proof = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/proof.json"), "utf8"));
const gaps = [];

const realCases = proof.caseStudies.filter((c) => !c.placeholder);
const realQuotes = proof.testimonials.filter((t) => !t.placeholder);
const realTeam = proof.team.filter((t) => !t.placeholder);
// Rows carry either a sourced percentage or a fixed amount; either counts as real.
const stackRows = proof.valueStack.rows.filter((r) => r.pct || r.amount);

// agentReviews is Alec's brokerage work: buyer-side, out of area, and from a public
// third-party profile. It is real proof of something, but it is NOT seller proof, and it must
// never be able to clear the launch blocker below. Kept deliberately out of realQuotes.
const agentReviews = (proof.agentReviews && proof.agentReviews.reviews) || [];
for (const r of agentReviews) {
  if (!r.source) {
    errors.push(`agentReviews entry (${r.location}) has no source platform named.`);
  }
  if (!r.sourceUrl) {
    warnings.push(
      `agentReviews entry (${r.location}, ${r.source}) has no sourceUrl, so it renders nothing. ` +
        `A quoted review is a claim; a linked one is checkable. Paste the profile URL.`
    );
  }
}

if (!realCases.length) gaps.push("no real closed-deal case studies (proof.caseStudies)");
if (!realQuotes.length) gaps.push("no real testimonials (proof.testimonials)");
if (!realTeam.length) gaps.push("no real team bio or photo (proof.team) — the biggest E-E-A-T signal on the site");
if (!stackRows.length) gaps.push("no verified value-stack figures (proof.valueStack.rows)");
// A percentage without a citation is an assertion, not a figure.
for (const r of proof.valueStack.rows) {
  if (r.pct && !r.source) {
    errors.push(`valueStack row "${r.label}" has a percentage but no source. Cite it or drop it.`);
  }
}
if (!proof.guarantee.enabled) gaps.push("no guarantee confirmed (proof.guarantee)");
if (!site_gbp()) gaps.push("Google Business Profile URL not set (site.social.gbp) — needed for sameAs and NAP matching");

// The site's phone must carry an area code local to the service area. An out-of-market
// area code reads as a call centre to a Gastonia seller and is a weak local signal to
// Google. 704/980 are Charlotte metro; 828 covers the western edge.
const LOCAL_AREA_CODES = ["704", "980", "828"];
const phoneAreaCode = (site_phone() || "").replace(/\D/g, "").replace(/^1/, "").slice(0, 3);
if (!LOCAL_AREA_CODES.includes(phoneAreaCode)) {
  gaps.push(
    `site.phoneRaw area code ${phoneAreaCode || "(unset)"} is outside the service area ` +
      `(${LOCAL_AREA_CODES.join("/")}). Use a local number on the site and keep the memorable ` +
      `one for direct mail.`
  );
}

function site_phone() {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/site.json"), "utf8")).phoneRaw;
  } catch (e) {
    return "";
  }
}

function site_gbp() {
  try {
    const s = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/site.json"), "utf8"));
    return s.social && s.social.gbp;
  } catch (e) {
    return false;
  }
}

// Any literal placeholder text that leaked into rendered HTML is always an error.
for (const p of pages) {
  const html = fs.readFileSync(p.file, "utf8");
  if (/PLACEHOLDER|TODO_PROOF|\$_____/.test(html)) {
    errors.push(`${p.rel}: placeholder text leaked into the rendered page`);
  }
}

for (const g of gaps) {
  if (STRICT) errors.push("LAUNCH BLOCKER: " + g);
  else warnings.push(g);
}

// ------------------------------------------------- Two-Number Promise guardrails
// Always errors, never a warning: if the flag is on, the site is advertising
// brokerage services, and you cannot do that anonymously. These conditions must
// hold the moment the feature is public, not by launch day.
const site = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/site.json"), "utf8"));
if (site.twoNumberPromise && site.twoNumberPromise.enabled) {
  if (!site.licenseNumber) {
    errors.push(
      "twoNumberPromise is ENABLED but site.licenseNumber is empty. The site is advertising " +
        "brokerage services with no license number on it. Set it or turn the flag off."
    );
  }
  if (!realTeam.length) {
    errors.push(
      "twoNumberPromise is ENABLED but proof.team has no real bio. A named, real person has to " +
        "stand behind a brokerage offer. Fill proof.team or turn the flag off."
    );
  }
  const tnPage = path.join(SITE, "two-number-promise/index.html");
  if (!fs.existsSync(tnPage)) {
    errors.push("twoNumberPromise is ENABLED but /two-number-promise/ was not built.");
  }
} else {
  // Flag off: nothing about the feature may appear anywhere in the output.
  for (const p of pages) {
    const html = fs.readFileSync(p.file, "utf8");
    if (/two-number|Two-Number|brokerage license|we'll list it|we can list it/i.test(html)) {
      errors.push(`${p.rel}: Two-Number Promise content leaked while the flag is OFF`);
    }
  }
}

// -------------------------------------- agent reviews must stay off city pages
// caseStudies gets this protection structurally via outOfArea; agentReviews gets it here,
// enforced rather than trusted. Showing a Thomasville buyer review on a Gastonia page is
// exactly the thing this site accuses competitors of.
for (const r of agentReviews) {
  const fingerprint = r.quote.slice(0, 60);
  for (const pg of pages) {
    if (!/\/sell-my-house-fast-[a-z-]+-nc\//.test(pg.rel)) continue;
    if (fs.readFileSync(pg.file, "utf8").includes(fingerprint)) {
      errors.push(
        `${pg.rel}: an agentReviews quote (${r.location}, ${r.side}-side) is rendering on a ` +
          `city page. Agent-side, out-of-area reviews belong on /about/ and /reviews/ only.`
      );
    }
  }
}

// ------------------------------------------------- market-data staleness gate
// Published market statistics rot. A median sale price from eighteen months ago is
// not a stale detail on this site, it is a credibility hole: the whole argument here
// is that our numbers are real and checkable. So any city carrying market data must
// carry a date, and the build fails once that date goes stale. Nothing silently ages.
const MARKET_DATA_MAX_AGE_MONTHS = 6;
const cityData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/cities.json"), "utf8"));
const now = new Date();
for (const c of cityData) {
  const hasMarketData = c.medianHomeValue || c.medianDaysOnMarket || c.monthsInventory;
  if (!hasMarketData) continue;

  if (!c.marketDataSource) {
    errors.push(`${c.name}: has market data but no marketDataSource. Cite it or drop it.`);
  }
  if (!c.marketDataAsOf) {
    errors.push(`${c.name}: has market data but no marketDataAsOf date.`);
    continue;
  }
  // YYYY-MM is required. A bare year gives no freshness signal and reads oddly mid-year.
  if (!/^\d{4}-\d{2}$/.test(c.marketDataAsOf)) {
    errors.push(
      `${c.name}: marketDataAsOf is "${c.marketDataAsOf}", expected YYYY-MM (e.g. "2026-09").`
    );
    continue;
  }
  const [y, m] = c.marketDataAsOf.split("-").map(Number);
  const ageMonths = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  if (ageMonths > MARKET_DATA_MAX_AGE_MONTHS) {
    errors.push(
      `${c.name}: market data is ${ageMonths} months old (${c.marketDataAsOf}), over the ` +
        `${MARKET_DATA_MAX_AGE_MONTHS}-month limit. Refresh it from a real source or null the fields.`
    );
  }
}

// ------------------------------------------- no build scaffolding in production
// Every one of the 63 pages once shipped a dashed orange box addressed to Alec by
// name, telling him to add testimonials to src/_data/proof.json. It rendered on the
// homepage. Review notices are scaffolding; they belong in review and staging builds
// and nowhere else. src/_data/env.js gates them, and this makes the gate load-bearing.
const SITE_ENV = (process.env.SITE_ENV || "production").toLowerCase();
if (SITE_ENV === "production") {
  const SCAFFOLD = [
    ["review notice", /placeholder-note">/],
    ["an instruction addressed to the site owner", /Alec supplies|Add them to <code>|One URL from Alec/],
    ["a source-file path in visible copy", /src\/_data\/[a-z]+\.json/],
  ];
  for (const p of pages) {
    const raw = fs.readFileSync(p.file, "utf8");
    const body = raw.replace(/<style[\s\S]*?<\/style>/g, " ");
    for (const [label, re] of SCAFFOLD) {
      if (re.test(body)) {
        errors.push(
          `${p.rel}: ships ${label} to visitors. Guard it with env.showReviewNotices, or ` +
            `build with SITE_ENV=review to see it locally.`
        );
      }
    }
  }
}

// ------------------------------------------------------------- house typography
// Standing Monthaven rule: no em dashes and no curly quotes in seller-facing copy.
// It reads robotic and it is an AI tell. 183 of them accumulated before the rule was
// written down; the gate exists so the count stays at zero rather than creeping back.
const TYPO = [
  ["em dash", /\u2014|&mdash;|&#8212;/g, "a comma, a colon, or a full stop"],
  ["curly apostrophe", /\u2019|&rsquo;|&lsquo;/g, "a straight apostrophe"],
  ["curly quote", /\u201c|\u201d|&ldquo;|&rdquo;/g, "straight quotes"],
  ["ellipsis character", /\u2026/g, "three full stops"],
];
// Scan the RAW html, not textOf() output: textOf strips &entity; forms, so an
// &mdash; would be invisible to a check that ran on the stripped text. En dashes
// (&ndash;) are left alone - they are correct typography in a numeric range.
for (const p of pages) {
  const raw = fs.readFileSync(p.file, "utf8");
  for (const [label, re, fix] of TYPO) {
    const hits = raw.match(re);
    if (hits) {
      errors.push(`${p.rel}: ${hits.length} ${label}(s) in rendered copy. Use ${fix}.`);
    }
  }
}
// The JS bundle is seller-facing too: its strings render as status messages and button
// labels, and a template-only scan never reaches them.
const bundle = path.join(SITE, "js/main.js");
if (fs.existsSync(bundle)) {
  const js = fs.readFileSync(bundle, "utf8");
  for (const [label, re, fix] of TYPO) {
    const hits = js.match(re);
    if (hits) errors.push(`js/main.js: ${hits.length} ${label}(s). Use ${fix}.`);
  }
}

// -------------------------------------------------------------- US spelling
// The audience is North Carolina homeowners. British spellings read as foreign
// and undercut the "we're local" claim the whole site rests on.
const UK_SPELLINGS =
  /\b(centre|neighbour|colour|favour|organis[ei]|realis[ei]|incentivis[ei]|apologis[ei]|recognis[ei]|behaviour|licence|maths|whilst|amongst|practise|cheque|storey|kerb|tyre|aluminium|travelling|labour|honour)\b/gi;
for (const p of pages) {
  const text = textOf(fs.readFileSync(p.file, "utf8"));
  const hits = [...new Set((text.match(UK_SPELLINGS) || []).map((h) => h.toLowerCase()))];
  if (hits.length) errors.push(`${p.rel}: British spelling(s) - ${hits.join(", ")}`);
}

// ---------------------------------------------------------- thin content check
const MIN_WORDS = { city: 700, situation: 600, post: 700, page: 250 };
const corpus = [];
for (const p of pages) {
  const html = fs.readFileSync(p.file, "utf8");
  const text = textOf(html);
  const words = text.split(" ").length;

  let type = "page";
  if (/\/sell-my-house-fast-[a-z-]+-nc\//.test(p.rel)) type = "city";
  else if (/^\/(stop-foreclosure|sell-inherited-house|sell-house-|sell-rental-property|sell-vacant-house)/.test(p.rel)) type = "situation";
  else if (p.rel.startsWith("/blog/") && p.rel !== "/blog/index.html") type = "post";
  else if (/\/(privacy|terms|sms|accessibility|404|thank-you|get-offer)/.test(p.rel)) type = "skip";

  if (type === "skip") continue;
  if (words < MIN_WORDS[type]) {
    errors.push(`${p.rel}: ${words} words, under the ${MIN_WORDS[type]} minimum for a ${type} page`);
  }
  if (type === "city" || type === "situation") corpus.push({ ...p, type, trigrams: trigrams(text) });
}

// --------------------------------------------------- duplicate-content defense
// Boilerplate repeating is fine; near-identical pages are how a site of city
// pages gets algorithmically filtered. Compare like against like.
const MAX_OVERLAP = 0.72;
for (let i = 0; i < corpus.length; i++) {
  for (let j = i + 1; j < corpus.length; j++) {
    if (corpus[i].type !== corpus[j].type) continue;
    const o = overlap(corpus[i].trigrams, corpus[j].trigrams);
    if (o > MAX_OVERLAP) {
      errors.push(
        `${corpus[i].rel} and ${corpus[j].rel} are ${(o * 100).toFixed(0)}% identical ` +
          `(limit ${MAX_OVERLAP * 100}%). Add genuinely unique local content or drop one.`
      );
    }
  }
}

// ------------------------------------------------------------------- reporting
if (warnings.length) {
  console.warn("\n" + warnings.length + " warning(s):");
  for (const w of warnings) console.warn("  ! " + w);
  console.warn(
    "\n  The site builds and is reviewable, but it is NOT launchable until the gaps\n" +
      "  above are filled with real, verifiable material in src/_data/proof.json.\n" +
      "  Nothing is fabricated to fill them. `npm run check:launch` fails until they are.\n"
  );
}

if (errors.length) {
  console.error("\ncheck-content FAILED with " + errors.length + " error(s):\n");
  for (const e of errors) console.error("  ✗ " + e);
  process.exit(1);
}
console.log(`check-content OK — ${pages.length} pages pass depth and uniqueness checks.`);
