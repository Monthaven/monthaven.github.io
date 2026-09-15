#!/usr/bin/env node
// Build gate: every internal link and every referenced asset must resolve to a
// real file in _site/, and every page's canonical must match its own output path.
//
// The old site shipped with a nav pointing at pages unreachable from 13 of 16
// templates, canonicals disagreeing with the generated sitemap, and four og:image
// files that did not exist. All of it would have failed this check.

import fs from "node:fs";
import path from "node:path";

const SITE = path.join(process.cwd(), "_site");
const BASE = "https://monthavencapital.com";
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

if (!fs.existsSync(SITE)) {
  console.error("check-links: _site/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

const allFiles = walk(SITE).map((f) => "/" + path.relative(SITE, f).split(path.sep).join("/"));
const fileSet = new Set(allFiles);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));

function resolves(urlPath) {
  if (fileSet.has(urlPath)) return true;
  if (urlPath.endsWith("/") && fileSet.has(urlPath + "index.html")) return true;
  if (fileSet.has(urlPath + "/index.html")) return true;
  if (fileSet.has(urlPath + ".html")) return true; // GitHub Pages extensionless resolution
  return false;
}

for (const rel of htmlFiles) {
  const html = fs.readFileSync(path.join(SITE, rel.slice(1)), "utf8");
  const pageUrl = rel.replace(/index\.html$/, "");

  // --- internal links
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    if (!clean.startsWith("/")) {
      warnings.push(`${rel}: relative href "${href}" — prefer root-relative`);
      continue;
    }
    if (!resolves(clean)) errors.push(`${rel}: dead link -> ${href}`);
  }

  // --- referenced assets (src= and og/twitter image meta)
  const srcs = [...html.matchAll(/\bsrc="([^"]+)"/g)].map((m) => m[1]);
  const metas = [...html.matchAll(/<meta[^>]+content="([^"]+\.(?:png|jpg|jpeg|svg|webp|avif))"/g)].map(
    (m) => m[1]
  );
  for (const raw of [...srcs, ...metas]) {
    if (/^(https?:|data:)/.test(raw)) {
      if (raw.startsWith(BASE)) {
        const p = raw.slice(BASE.length).split("?")[0];
        if (!resolves(p)) errors.push(`${rel}: missing asset -> ${raw}`);
      }
      continue;
    }
    const p = raw.split("?")[0];
    if (p.startsWith("/") && !resolves(p)) errors.push(`${rel}: missing asset -> ${raw}`);
  }

  // --- canonical must match this page's own URL
  const isStub = html.includes('http-equiv="refresh"');
  const canon = html.match(/rel="canonical" href="([^"]+)"/);
  if (canon && !isStub) {
    const expected = BASE + pageUrl;
    if (canon[1] !== expected) {
      errors.push(`${rel}: canonical is ${canon[1]}, should be ${expected}`);
    }
  } else if (!canon && !isStub) {
    errors.push(`${rel}: no canonical tag`);
  }

  // --- every page needs a title and description
  if (!/<title>[^<]{5,}<\/title>/.test(html) && !isStub) {
    errors.push(`${rel}: missing or empty <title>`);
  }
}

// --- sitemap must agree with canonicals and contain no junk
const smPath = path.join(SITE, "sitemap.xml");
if (!fs.existsSync(smPath)) {
  errors.push("sitemap.xml was not generated");
} else {
  const sm = fs.readFileSync(smPath, "utf8");
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) errors.push("sitemap.xml has no <loc> entries");
  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) errors.push(`sitemap: duplicate entry -> ${loc}`);
    seen.add(loc);
    const p = loc.replace(BASE, "");
    if (!p) {
      // loc === BASE with no trailing slash: a second, non-canonical homepage URL.
      errors.push(`sitemap: bare root URL without trailing slash -> ${loc}`);
      continue;
    }
    if (p.endsWith(".html")) errors.push(`sitemap: .html URL contradicts canonicals -> ${loc}`);
    if (!resolves(p)) errors.push(`sitemap: URL does not resolve -> ${loc}`);
    const file = path.join(SITE, p.replace(/\/$/, "/index.html").slice(1));
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      const h = fs.readFileSync(file, "utf8");
      if (h.includes('http-equiv="refresh"')) errors.push(`sitemap: redirect stub listed -> ${loc}`);
      if (/name="robots" content="[^"]*noindex/.test(h)) {
        errors.push(`sitemap: noindex page listed -> ${loc}`);
      }
    }
  }
}

// --- nothing internal may be published
for (const f of allFiles) {
  if (f.endsWith(".md")) errors.push(`internal markdown published: ${f}`);
  if (f === "/_redirects") errors.push("_redirects is in the build output");
}

// --- the four A2P-frozen URLs must exist at their exact paths
for (const frozen of ["/text/index.html", "/privacy/index.html", "/terms/index.html", "/legal/sms/index.html"]) {
  if (!fileSet.has(frozen)) {
    errors.push(`FROZEN URL MISSING: ${frozen} — this URL is filed with the carriers for A2P messaging`);
  }
}
const textPage = path.join(SITE, "text/index.html");
if (fs.existsSync(textPage)) {
  const t = fs.readFileSync(textPage, "utf8");
  if (!t.includes('name="opt_in_url" value="https://monthavencapital.com/text"')) {
    errors.push("/text/: opt_in_url hidden field no longer matches the value filed with the carriers");
  }
}

// --- llms.txt is what LLM crawlers read directly. It is generated from src/_data/
// (src/llms.njk), but it is also the file most likely to rot unnoticed, because
// nothing renders it in a browser. It previously shipped the direct-mail-only phone
// number and listed 10 of 28 cities. These checks make that impossible.
const llmsPath = path.join(SITE, "llms.txt");
if (!fs.existsSync(llmsPath)) {
  errors.push("llms.txt was not built — LLM crawlers have no machine-readable summary");
} else {
  const llms = fs.readFileSync(llmsPath, "utf8");
  const siteData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/site.json"), "utf8"));
  const cityData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/cities.json"), "utf8"));

  // The memorable number is for direct mail only. On the website — and this file is
  // part of the website — it breaks NAP consistency against the Google Business Profile.
  if (siteData.phoneMemorable && llms.includes(siteData.phoneMemorable)) {
    errors.push(
      `llms.txt publishes phoneMemorable (${siteData.phoneMemorable}). That number is for ` +
        `direct mail only; the site number is ${siteData.phoneDisplay}.`
    );
  }
  if (!llms.includes(siteData.phoneDisplay)) {
    errors.push(`llms.txt does not contain the site phone number ${siteData.phoneDisplay}`);
  }
  if (!llms.includes(siteData.email)) {
    errors.push(`llms.txt does not contain the site email ${siteData.email}`);
  }

  // Every city the site builds must be listed, or the crawler's picture of the service
  // area is smaller than the site's.
  for (const c of cityData) {
    if (!llms.includes(c.name)) {
      errors.push(`llms.txt omits ${c.name}, ${c.county} County — the site builds a page for it`);
    }
  }

  // Every URL it advertises must actually resolve in this build.
  for (const m of llms.matchAll(/https:\/\/monthavencapital\.com(\/[^\s)]*)/g)) {
    const urlPath = m[1].replace(/\/$/, "") || "/";
    const target = urlPath === "/" ? "/index.html" : urlPath + "/index.html";
    if (!fileSet.has(target) && !fileSet.has(urlPath)) {
      errors.push(`llms.txt links ${m[0]} which does not exist in this build`);
    }
  }
}

// --- call and text are DIFFERENT numbers, and the site must never say otherwise
// phoneDisplay is a voice line whose SMS webhook points at a different system; smsDisplay
// is the toll-free that is A2P-registered and wired to the machine that reads and answers
// seller texts. A text sent to the voice number lands in an inbox nobody is replying from.
// This regressed once already: a pass fixed four templates and left the site-wide header
// saying "Call or text <voice>" on all 63 pages, so the same page said both things.
{
  const siteData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/site.json"), "utf8"));
  const voice = siteData.phoneDisplay;
  const voiceRaw = siteData.phoneRaw;
  const smsRaw = siteData.smsRaw;
  const voiceDigits = (voiceRaw || "").replace(/\D/g, "");

  for (const rel of htmlFiles) {
    const html = fs.readFileSync(path.join(SITE, rel.slice(1)), "utf8");
    const text = html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ");

    // "call or text" / "text or call" joins the two into one number, whichever follows.
    if (/\b(call or text|text or call)\b/i.test(text)) {
      errors.push(
        `${rel}: says "call or text" as though one number did both. Call ${voice}; text ` +
          `${siteData.smsDisplay}. Name them separately.`
      );
    }

    // An invitation to text the voice number, however worded. Directional on purpose:
    // "text <voice>" is wrong, while "call <voice> or text <toll-free>" is the correct
    // copy and puts the voice number BEFORE the word text. Matching both directions
    // flagged every correct page on the site.
    if (voice) {
      const esc = voice.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp("\\btext(ing)?\\b[^.]{0,25}" + esc, "i").test(text)) {
        errors.push(`${rel}: invites a text to the voice number ${voice}.`);
      }
    }

    // sms: hrefs must point at the toll-free and nothing else.
    for (const m of html.matchAll(/href="sms:([^"]+)"/g)) {
      const target = m[1].replace(/\D/g, "");
      if (target !== (smsRaw || "").replace(/\D/g, "")) {
        errors.push(
          `${rel}: sms: link points at ${m[1]}, not the A2P-registered toll-free ${siteData.smsDisplay}.` +
            (target === voiceDigits ? " That is the voice line." : "")
        );
      }
    }
  }
}

// --- zero third-party requests on the critical path
for (const rel of htmlFiles) {
  const html = fs.readFileSync(path.join(SITE, rel.slice(1)), "utf8");
  if (html.includes("fonts.googleapis.com") || html.includes("fonts.gstatic.com")) {
    errors.push(`${rel}: Google Fonts request — must be self-hosted or system stack`);
  }
  if (html.includes("images.unsplash.com")) {
    errors.push(`${rel}: hotlinked Unsplash image`);
  }
}

for (const w of warnings) console.warn("warn  " + w);
if (errors.length) {
  console.error("\ncheck-links FAILED with " + errors.length + " error(s):\n");
  for (const e of errors) console.error("  ✗ " + e);
  process.exit(1);
}
console.log(
  `check-links OK — ${htmlFiles.length} pages, all links, assets, canonicals and sitemap entries resolve.`
);
