#!/usr/bin/env node
// Browser test of the lead seam.
//
// check-lead-path.mjs proves the CONFIGURATION is right. This proves the BEHAVIOUR is,
// by driving a real Chromium through a real form fill and intercepting what the browser
// actually puts on the wire. curl cannot do this: it never builds a FormData, never
// fires a CORS preflight, and never runs the failover branch.
//
// Every request is stubbed, so this never touches SONA or Formspree and never creates
// a lead. What it therefore CANNOT prove is the CORS preflight against the live SONA:
// Content-Type: application/json is not a simple header, so a seller's browser sends
// OPTIONS first, and only the real endpoint on the real origin answers that. That stays
// a manual step. See docs/go-live-runbook.md step 2.
//
//   npm run test:lead-path
//
// Playwright is not a dependency of this repo. Point PLAYWRIGHT_DIR at an install that
// has it, or run `npm i playwright` somewhere and set the var.

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createRequire } from "node:module";

const SITE = path.join(process.cwd(), "_site");
const PORT = Number(process.env.LEAD_TEST_PORT || 4322);
const ORIGIN = `http://127.0.0.1:${PORT}`;

if (!fs.existsSync(SITE)) {
  console.error("lead-path-browser-test: _site/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

const site = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/_data/site.json"), "utf8"));
const PRIMARY = site.leadEndpoint;
const FALLBACK = site.leadEndpointFallback;

// ------------------------------------------------------------------ playwright
let chromium;
try {
  const req = createRequire(
    path.join(process.env.PLAYWRIGHT_DIR || process.cwd(), "package.json")
  );
  ({ chromium } = req("playwright"));
} catch {
  console.error(
    "lead-path-browser-test: playwright not found.\n" +
      "  Install it somewhere and set PLAYWRIGHT_DIR to that directory, e.g.\n" +
      "    npm i playwright --prefix /tmp/pw && PLAYWRIGHT_DIR=/tmp/pw npm run test:lead-path"
  );
  process.exit(1);
}

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  if (!fs.existsSync(root)) return undefined;
  for (const d of fs.readdirSync(root)) {
    const p = path.join(root, d, "chrome-linux/chrome");
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

// ---------------------------------------------------------------- static server
const TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png",
  ".xml": "application/xml", ".json": "application/json", ".txt": "text/plain",
};
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(SITE, p);
  if (!f.startsWith(SITE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    res.writeHead(404); return res.end("not found");
  }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});

const results = [];
const ok = (name, detail = "") => results.push({ pass: true, name, detail });
const bad = (name, detail) => results.push({ pass: false, name, detail });

// Fill and submit, with both endpoints stubbed. `primaryStatus` decides what SONA
// "answers", which is what drives the failover branch under test.
async function submit(page, { primaryStatus, withPhone = false }) {
  const seen = [];
  await page.route("**/*", async (route) => {
    const req = route.request();
    const url = req.url();
    if (url.startsWith(PRIMARY)) {
      seen.push({
        which: "primary", method: req.method(),
        contentType: req.headers()["content-type"] || "",
        body: req.postData() || "",
      });
      return route.fulfill({
        status: primaryStatus,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ ok: primaryStatus < 400 }),
      });
    }
    if (url.startsWith(FALLBACK)) {
      seen.push({
        which: "fallback", method: req.method(),
        contentType: req.headers()["content-type"] || "",
        body: req.postData() || "",
      });
      return route.fulfill({
        status: 200, contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: "{}",
      });
    }
    return route.continue();
  });

  await page.goto(`${ORIGIN}/get-offer/`, { waitUntil: "networkidle" });

  // There is a fill-time floor on the form: submitting too fast is treated as a bot.
  await page.waitForTimeout(4000);

  // Step 1 holds address, email, phone and the consent box, and validateStep1 wants an
  // address plus at least one of phone/email before it will reveal step 2.
  await page.fill('[data-lead-form] [name="address"]', "123 Test Street, Gastonia NC");
  // Email only, no phone: no phone means no confirmation text goes out, which is the
  // same rule the manual runbook test follows.
  await page.fill('[data-lead-form] [name="email"]', "leadpathtest@example.com");
  if (withPhone) {
    await page.fill('[data-lead-form] [name="phone"]', "7045550123");
    const consent = page.locator('[data-lead-form] [name="sms_consent"]').first();
    if (await consent.count()) await consent.check();
  }

  const next = page.locator("[data-lead-form] [data-next-step]").first();
  if (await next.count()) {
    await next.click();
    await page.locator('[data-lead-form] [data-step="2"]').first().waitFor({ state: "visible" });
  }

  // Step 2.
  await page.fill('[data-lead-form] [name="name"]', "Test Seller");

  await page.locator('[data-lead-form] button[type="submit"]').first().click();
  await page.waitForTimeout(1500);
  await page.unroute("**/*");
  return seen;
}

// ------------------------------------------------------------------------ run
await new Promise((r) => server.listen(PORT, r));
const browser = await chromium.launch({ executablePath: findChrome() });

try {
  // 1. Happy path. This is the direct regression test for the multipart bug: if the
  //    primary ever goes out as multipart/form-data, SONA receives every field empty
  //    and reports nothing wrong.
  {
    const page = await browser.newPage();
    const seen = await submit(page, { primaryStatus: 200 });
    await page.close();
    const p = seen.find((s) => s.which === "primary");
    if (!p) {
      bad("primary POST fires", "no request to leadEndpoint at all");
    } else {
      p.method === "POST"
        ? ok("primary POST fires", PRIMARY)
        : bad("primary POST fires", `method was ${p.method}`);
      /application\/json/.test(p.contentType)
        ? ok("primary is JSON, not multipart", p.contentType)
        : bad("primary is JSON, not multipart",
            `Content-Type was "${p.contentType}". SONA does not parse multipart; every ` +
            `field would arrive empty with no error anywhere.`);
      let body = null;
      try { body = JSON.parse(p.body); } catch {}
      body && body.address && body.email
        ? ok("primary body carries the fields", Object.keys(body).join(", "))
        : bad("primary body carries the fields", `parsed: ${JSON.stringify(body)}`);
      body && body.opt_in_url
        ? ok("opt_in_url present for consent evidence", body.opt_in_url)
        : bad("opt_in_url present for consent evidence", "missing from the body");
    }
    seen.some((s) => s.which === "fallback")
      ? bad("no fallback on success", "Formspree was posted to on a 200")
      : ok("no fallback on success");
  }

  // 2. A 5xx is SONA being down. The lead must not be lost.
  {
    const page = await browser.newPage();
    const seen = await submit(page, { primaryStatus: 500 });
    await page.close();
    const fbs = seen.filter((s) => s.which === "fallback");
    fbs.length === 1
      ? ok("5xx fails over to Formspree exactly once")
      : bad("5xx fails over to Formspree exactly once", `fallback fired ${fbs.length} times`);
    if (fbs[0]) {
      /multipart\/form-data/.test(fbs[0].contentType)
        ? ok("fallback is multipart, as Formspree expects", "multipart/form-data")
        : bad("fallback is multipart, as Formspree expects", `Content-Type was "${fbs[0].contentType}"`);
    }
  }

  // 3. A 4xx is SONA rejecting on purpose (bot trap, fill-time floor, rate limit, bad
  //    input). Re-posting that to Formspree just duplicates a bad lead.
  {
    const page = await browser.newPage();
    const seen = await submit(page, { primaryStatus: 422 });
    await page.close();
    seen.some((s) => s.which === "fallback")
      ? bad("4xx does NOT fail over",
          "a deliberate rejection was re-posted to Formspree, duplicating a bad lead")
      : ok("4xx does NOT fail over");
  }
} finally {
  await browser.close();
  server.close();
}

// --------------------------------------------------------------------- report
for (const r of results) {
  console.log(`  ${r.pass ? "✓" : "✗"} ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
}
const failed = results.filter((r) => !r.pass);
console.log(
  `\nlead-path-browser-test: ${results.length - failed.length}/${results.length} passed.\n` +
    "  Not covered here: the CORS preflight against the live SONA from the production\n" +
    "  origin. Only a real browser against the real endpoint exercises that.\n" +
    "  docs/go-live-runbook.md step 2.\n"
);
process.exit(failed.length ? 1 : 0);
