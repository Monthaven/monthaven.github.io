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
