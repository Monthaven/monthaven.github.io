#!/usr/bin/env node
// Lead-path gate.
//
// Every other check in this directory gates CONTENT: links, canonicals, duplicate
// text, typography, unfilled proof. None of them gated where a lead actually goes,
// and that gap has already bitten once, when the form was found still posting to
// Formspree while every check passed green.
//
// This file asserts the seam described in CLAUDE.md, the one that must not be
// "simplified" into a single code path. All of it is statically checkable. What is
// NOT checkable here is the CORS preflight, because Content-Type: application/json
// is not a simple header and only a real browser against a real SONA exercises it.
// docs/go-live-runbook.md step 2 is still a manual step and always will be.

import fs from "node:fs";
import path from "node:path";

const SITE = path.join(process.cwd(), "_site");
const errors = [];
const warnings = [];

if (!fs.existsSync(SITE)) {
  console.error("check-lead-path: _site/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

const site = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/site.json"), "utf8"));

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}
const rel = (f) => f.slice(SITE.length).replace(/\\/g, "/");

// ------------------------------------------------------------------ endpoints
const primary = (site.leadEndpoint || "").trim();
const fallback = (site.leadEndpointFallback || "").trim();

if (!primary) {
  errors.push("site.leadEndpoint is empty. Leads would have nowhere to go.");
} else if (!/^https:\/\//.test(primary)) {
  errors.push(`site.leadEndpoint is not https: ${primary}`);
}

// The specific regression this gate exists for. Formspree is the SAFETY NET. If it
// is ever sitting in the primary slot, the lead still arrives in email and nothing
// looks broken, while SONA never creates the row, never records TCPA consent, never
// texts the seller and never puts them on the Caller desk.
if (primary && /formspree/i.test(primary)) {
  errors.push(
    "site.leadEndpoint points at Formspree. That is the FALLBACK, not the intake. " +
      "A lead posted there is never recorded in SONA, so no consent evidence, no " +
      "confirmation text and nothing on the Caller desk. See CLAUDE.md."
  );
}

if (!fallback) {
  errors.push(
    "site.leadEndpointFallback is empty. SONA runs on a box behind a Cloudflare " +
      "tunnel; without the fallback a dead tunnel loses the lead outright."
  );
} else if (fallback === primary) {
  errors.push("site.leadEndpointFallback is the same URL as the primary, so it is not a fallback.");
}

// --------------------------------------------------------------- form markup
// Every rendered lead form has to agree with site.json. One page drifting is one
// page quietly posting somewhere else.
const pages = walk(SITE);
let formsFound = 0;

for (const f of pages) {
  const html = fs.readFileSync(f, "utf8");
  for (const tag of html.match(/<form\b[^>]*data-lead-form[^>]*>/g) || []) {
    formsFound++;
    const action = (tag.match(/\saction="([^"]*)"/) || [])[1] || "";
    const fb = (tag.match(/\sdata-fallback-action="([^"]*)"/) || [])[1] || "";
    if (action !== primary) {
      errors.push(`${rel(f)}: lead form action is "${action}", expected site.leadEndpoint.`);
    }
    if (fb !== fallback) {
      errors.push(`${rel(f)}: lead form data-fallback-action is "${fb}", expected site.leadEndpointFallback.`);
    }
  }
}

if (!formsFound) {
  errors.push("No lead form found in the whole build. Either the form broke or the selector did.");
}

// -------------------------------------------------------------------- the JS
// The split, asserted in the SHIPPED bundle rather than the source, because what
// reaches a seller's browser is what matters.
const jsPath = path.join(SITE, "js/main.js");
if (!fs.existsSync(jsPath)) {
  errors.push("_site/js/main.js is missing, so no form on the site can submit at all.");
} else {
  const js = fs.readFileSync(jsPath, "utf8");

  // A bare FormData handed to fetch() sends multipart. SONA does not parse multipart,
  // so every field arrives empty and nothing errors anywhere. The primary must
  // serialize to JSON and the fallback must stay multipart. One code path means one
  // of the two is wrong.
  if (!/JSON\.stringify\(/.test(js)) {
    errors.push(
      "The bundle never calls JSON.stringify. The primary POST must serialize to JSON: " +
        "SONA does not parse multipart, and a FormData body fails silently with every " +
        "field empty."
    );
  }
  if (!/new FormData\(/.test(js)) {
    errors.push(
      "The bundle never constructs FormData. Formspree expects multipart, so collapsing " +
        "the fallback onto the JSON path breaks the safety net."
    );
  }
  if (!/application\/json/.test(js)) {
    errors.push("The bundle never sets Content-Type: application/json on the primary POST.");
  }

  // Fail over on transport and 5xx only. A 4xx means SONA received it and rejected it
  // on purpose (bot trap, fill-time floor, rate limit, bad input). Re-posting that to
  // Formspree just duplicates a bad lead.
  if (!/status\s*>=\s*400[\s\S]{0,80}status\s*<\s*500/.test(js)) {
    errors.push(
      "The 4xx guard is gone from the bundle. Without it a deliberate rejection " +
        "(bot trap, rate limit, bad input) fails over to Formspree and duplicates a bad lead."
    );
  }

  // Without the latch, a 5xx from the primary followed by a transport failure on the
  // fallback reaches the outer .catch and posts a second time.
  if (!/fallbackUsed/.test(js)) {
    warnings.push(
      "The fallback single-use latch (fallbackUsed) is not in the bundle. A 5xx followed " +
        "by a transport failure can post the same lead to Formspree twice."
    );
  }
}

// ----------------------------------------------------------- frozen opt-in URL
// Filed with the carriers as proof of consent for the toll-free campaign. Carriers
// re-check it. The value is not ours to tidy.
const OPT_IN = "https://monthavencapital.com/text";
const textPage = path.join(SITE, "text/index.html");
if (!fs.existsSync(textPage)) {
  errors.push("/text/ is missing. It is filed with the carriers as a proof-of-consent URL.");
} else {
  const html = fs.readFileSync(textPage, "utf8");
  const v = (html.match(/name="opt_in_url"\s+value="([^"]*)"/) || [])[1];
  if (v !== OPT_IN) {
    errors.push(
      `/text/ opt_in_url is "${v}", expected exactly "${OPT_IN}". This value is filed ` +
        "with the carriers for the toll-free campaign and must not change."
    );
  }
}

// -------------------------------------------------------------------- report
for (const w of warnings) console.log(`  ! ${w}`);
if (errors.length) {
  console.error(`\ncheck-lead-path FAILED with ${errors.length} error(s):\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error(
    "\n  This gate covers everything about the lead path that can be checked without a\n" +
      "  browser. The CORS preflight cannot be: see docs/go-live-runbook.md step 2.\n"
  );
  process.exit(1);
}

console.log(
  `check-lead-path OK — ${formsFound} lead forms, all posting to SONA with the Formspree ` +
    `fallback intact.`
);
