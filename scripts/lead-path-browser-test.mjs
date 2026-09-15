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

// LEAD_TEST_LIVE=1 runs the one thing nothing else can cover: the real CORS preflight
// from the real production origin. It CREATES A REAL LEAD ROW every run. Opt-in only,
// never in CI, and it needs network access to the SONA host.
const LIVE = process.env.LEAD_TEST_LIVE === "1";
const LIVE_ORIGIN = process.env.LEAD_TEST_LIVE_ORIGIN || "https://monthavencapital.com";

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

// The test phone number, and why it is shaped this way.
//
// Alec's finding, 2026-09-15, correcting an instruction I had written. "Email only, no
// phone" and "confirm the seller shows on the Caller desk as INTERESTED" are mutually
// exclusive: no phone means no ledger row at all, so there is nothing on the desk to
// check. But a 555 exchange is rejected outright by the endpoint, which is why the
// obvious 999-555-xxxx test number does not work either.
//
// 999 is an unassigned NANP area code, so this can never route to a real person, while
// the exchange is not 555, so the endpoint accepts it and creates the row. The send path
// forces it to shadow. That satisfies both checks at once.
const TEST_PHONE = "9992010100";

// Fill and submit. `primaryStatus` decides what SONA "answers" in stubbed mode, which is
// what drives the failover branch under test. In live mode nothing on the SONA host is
// routed at all and primaryStatus is ignored: the real endpoint answers.
async function submit(page, { primaryStatus, live = false }) {
  const seen = [];
  await page.route("**/*", async (route) => {
    const req = route.request();
    const url = req.url();

    // LIVE MODE. Serve the document and its assets from _site at the production URL, so
    // the document origin is monthavencapital.com while the markup is this branch's.
    // Everything else, SONA included, is left alone: un-intercepted means the browser
    // fires the real CORS preflight and the real POST, which is the entire point. This
    // is Alec's technique, and it is the only way to exercise the production preflight
    // while /get-offer/ still 404s on the live site.
    if (live) {
      if (url.startsWith(LIVE_ORIGIN)) {
        let p = decodeURIComponent(new URL(url).pathname);
        if (p.endsWith("/")) p += "index.html";
        const f = path.join(SITE, p);
        if (f.startsWith(SITE) && fs.existsSync(f) && !fs.statSync(f).isDirectory()) {
          return route.fulfill({
            status: 200,
            contentType: TYPES[path.extname(f)] || "application/octet-stream",
            body: fs.readFileSync(f),
          });
        }
        return route.fulfill({ status: 404, body: "not found" });
      }
      return route.continue();
    }

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

  // In live mode the outcome is whatever the real endpoint says, so read it off the
  // responses rather than off the stub. requestfailed catches the preflight being
  // rejected, which surfaces in the browser as a failed request with no response.
  if (live) {
    page.on("response", async (res) => {
      const u = res.url();
      if (u.startsWith(PRIMARY) || u.startsWith(FALLBACK)) {
        seen.push({
          which: u.startsWith(PRIMARY) ? "primary" : "fallback",
          method: res.request().method(),
          status: res.status(),
          contentType: res.request().headers()["content-type"] || "",
          acao: res.headers()["access-control-allow-origin"] || "",
          acah: res.headers()["access-control-allow-headers"] || "",
        });
      }
    });
    page.on("requestfailed", (req) => {
      const u = req.url();
      if (u.startsWith(PRIMARY) || u.startsWith(FALLBACK)) {
        seen.push({
          which: u.startsWith(PRIMARY) ? "primary" : "fallback",
          method: req.method(),
          failed: req.failure() ? req.failure().errorText : "unknown",
        });
      }
    });
  }

  await page.goto(`${live ? LIVE_ORIGIN : ORIGIN}/get-offer/`, { waitUntil: "networkidle" });

  // There is a fill-time floor on the form: submitting too fast is treated as a bot.
  await page.waitForTimeout(4000);

  // Step 1 holds address, email, phone and the consent box, and validateStep1 wants an
  // address plus at least one of phone/email before it will reveal step 2.
  await page.fill('[data-lead-form] [name="address"]', "123 Test Street, Gastonia NC");
  await page.fill('[data-lead-form] [name="email"]', "leadpathtest@example.com");

  // The phone is what creates the ledger row, so live mode always sends one. Stubbed
  // mode sends it too: the field and its consent box are part of the shape of the body
  // being asserted, and leaving them empty would test a narrower payload than ships.
  await page.fill('[data-lead-form] [name="phone"]', TEST_PHONE);
  const consent = page.locator('[data-lead-form] [name="sms_consent"]').first();
  if (await consent.count()) await consent.check();

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
  if (LIVE) {
    // LIVE MODE. Exercises the real preflight and creates a real lead row. Everything
    // the stubbed suite covers is already covered; the only question here is whether the
    // browser's OPTIONS is answered and whether the POST lands on SONA rather than
    // quietly sliding to Formspree, which is what a rejected preflight looks like from
    // the outside: no error, lead in email, nothing on the Caller desk.
    console.log(
      `\n  LIVE MODE\n` +
        `  Document origin : ${LIVE_ORIGIN} (markup served from _site)\n` +
        `  Posting to      : ${PRIMARY} (not intercepted, real request)\n` +
        `  Phone           : ${TEST_PHONE}, unassigned 999 area code, cannot route\n` +
        `  This creates a real lead row. Delete it when you are done.\n`
    );
    const page = await browser.newPage();
    const seen = await submit(page, { live: true });
    await page.close();

    const primaries = seen.filter((s) => s.which === "primary");
    const fallbacks = seen.filter((s) => s.which === "fallback");
    const failed = primaries.find((s) => s.failed);
    const posted = primaries.find((s) => s.method === "POST" && s.status);

    if (failed) {
      bad("preflight accepted from the production origin",
        `the request to SONA failed outright (${failed.failed}). A rejected CORS ` +
        `preflight looks exactly like this, and the lead then falls to Formspree.`);
    } else if (!primaries.length) {
      bad("preflight accepted from the production origin", "no request reached SONA at all");
    } else {
      ok("preflight accepted from the production origin", LIVE_ORIGIN);
    }

    if (posted) {
      posted.status >= 200 && posted.status < 300
        ? ok("SONA accepted the lead", `HTTP ${posted.status}`)
        : bad("SONA accepted the lead", `HTTP ${posted.status}`);
      /application\/json/.test(posted.contentType)
        ? ok("primary went out as JSON", posted.contentType)
        : bad("primary went out as JSON", `Content-Type was "${posted.contentType}"`);
      if (posted.acao) ok("Access-Control-Allow-Origin returned", posted.acao);
    } else if (!failed) {
      bad("SONA accepted the lead", "no POST response was observed");
    }

    // The failure this mode exists to catch. A lead in Formspree looks like success.
    fallbacks.length
      ? bad("Formspree was never touched",
          `the lead fell through to the fallback, so SONA has no row, no consent ` +
          `evidence and nothing on the Caller desk`)
      : ok("Formspree was never touched");

    for (const r of results) {
      console.log(`  ${r.pass ? "✓" : "✗"} ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
    }
    const liveFailed = results.filter((r) => !r.pass);
    console.log(
      `\nlead-path-browser-test (LIVE): ${results.length - liveFailed.length}/${results.length} passed.\n` +
        (liveFailed.length
          ? `  No row to clean up: the lead did not reach SONA.\n`
          : `  Now check the row landed in sfh_leads with the right city and county, that\n` +
            `  the seller shows INTERESTED on the Caller desk, and delete it.\n`)
    );
    await browser.close();
    server.close();
    process.exit(liveFailed.length ? 1 : 0);
  }

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
