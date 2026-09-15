# Go-live runbook

Asked on 2026-09-15: should we go live? **Not yet**, and this is the ordered list of
what stands between here and yes. Decision taken: **staging first**, so the lead path
gets tested by us rather than by a seller.

## What was actually wrong when the question was asked

Two things, and only one of them was on the launch-blocker list.

1. **Every one of the 63 pages shipped a note addressed to Alec.** A dashed orange box:
   *"Awaiting real testimonials. Nothing is published here until Alec supplies real
   quotes from real sellers... Fabricated reviews are both a legal problem..."* plus a
   path to `src/_data/proof.json`. Two of them on the homepage. This was build
   scaffolding rendering as production copy.
2. **The deploy workflow ran `npm run check`, not `npm run check:launch`.** So the gate
   built to hold the site back was never wired to the job that publishes it. A push to
   `main` would have deployed green, with those boxes live.

Both are fixed. `src/_data/env.js` now gates review notices, and `check-content.mjs`
fails a production build that ships any of them.

## Step 0: check what `main` is serving right now

Found 2026-09-15 while answering "are we ready to push". `main`'s workflow uploads
`path: "."`, the whole repo root, and `.nojekyll` is present so files are served as-is.
`main` carries `SMS-IMPLEMENTATION-GUIDE.md`, `TOLL-FREE-VERIFICATION-ANSWERS.md` and
`docs/` at its root.

That means those are almost certainly public at monthavencapital.com today. Open

```
https://monthavencapital.com/TOLL-FREE-VERIFICATION-ANSWERS.md
```

If it loads, the carrier verification answers are readable by anyone. Merging this
branch is the fix, because this branch's `static.yml` uploads `_site` only and
`check-links.mjs` fails the build on a published internal doc.

This was not verifiable from the build container: its network policy denies outbound to
both `monthavencapital.com` and the SONA host, so it is a browser check, not a script.

## Step 1: staging

```
Actions > Staging build > Run workflow
```

Tick **publish_branch** to get a URL. It builds with `SITE_ENV=staging`, which means
noindex on every page, `robots.txt` disallowing everything, no CNAME, and a red STAGING
banner. The job hard-fails if a CNAME ever appears in the output, because two Pages
sites claiming `monthavencapital.com` would fight over it.

Then, once: **Settings > Pages** on a second repo pointed at `gh-pages-staging`. Or just
download the `monthaven-staging` artifact and open it locally.

## Step 2: the lead path, which is the whole point

Everything else on this list is cosmetic next to this.

**Two thirds of this is now automated.** Added 2026-09-15, because every check in
`scripts/` gated content and none gated where a lead goes, which is the gap that let the
form sit on Formspree while everything passed green.

- `scripts/check-lead-path.mjs`, in `npm run check` and `check:launch`, ahead of
  `check-content` so its result is never hidden behind the proof gate. Asserts the
  primary is SONA and not Formspree, that the fallback exists and differs, that all 87
  rendered forms agree with `site.json`, that the shipped bundle still contains both
  halves of the JSON/FormData split and the 4xx guard and the fallback latch, and that
  `/text/`'s `opt_in_url` still carries its exact filed value.
- `scripts/lead-path-browser-test.mjs` (`npm run test:lead-path`, and in CI) drives real
  Chromium through a real form fill with both endpoints stubbed. Proves the primary
  leaves as `application/json` carrying the fields, that a 5xx fails over to Formspree
  exactly once as multipart, and that a 4xx does not fail over at all. Verified to fail
  when the primary is collapsed onto the FormData path.

### The preflight: DONE, and now repeatable

**Run 2026-09-15 by Alec against the live endpoint. It passes. The production origin is
in SONA's allowlist and that assumption is retired.**

Two corrections he made to this list while running it, both of which are now folded in:

**`/get-offer/` 404s on the live site**, because the rebuild is not live, so "open it on
the live site" was impossible as written. The way through: serve the built page by
route interception while the **document origin stays `https://monthavencapital.com`**,
and leave the SONA requests un-intercepted so they hit the real tunnel. The allowlist
keys on the `Origin` header and Playwright's routes do not intercept the browser's
preflight, so that is the production preflight, not an approximation of it.

**Email only cannot prove INTERESTED.** No phone means no ledger row, so "use email
only" and "confirm the seller shows on the Caller desk" were mutually exclusive
instructions sitting two lines apart. The number to use is an **unassigned 999 area code
with a non-555 exchange**, e.g. `999-201-0100`: the endpoint's rejection rule is on the
555 exchange so this is accepted, 999 can never route, and the send path forces shadow.
That satisfies both checks at once.

Both are now encoded, so nobody has to rediscover them:

```bash
LEAD_TEST_LIVE=1 npm run test:lead-path
```

It serves `_site` at the production origin, posts for real, and asserts the preflight was
accepted, that SONA answered 2xx, and that **Formspree was never touched**. That last one
is the whole point: a rejected preflight looks like success from the outside, because the
lead still lands in email while SONA has no row, no consent evidence and nothing on the
Caller desk.

**It creates a real lead row on every run.** Opt-in only, never in CI. Afterwards check
the row in `sfh_leads` has the right city, county and source and shows INTERESTED, then
delete it.

### Still worth doing by hand

1. **Confirm SONA is alive.** `curl -X POST <leadEndpoint>` with an empty body. Healthy
   is **400 "Property address is required"**. A 200 means the validator let an empty
   body through and is a bug. A timeout means the tunnel is down.
2. **Re-run the live mode after any change to the origin**, whether that is a new
   subdomain, a CDN in front, or a staging host. A staging origin is a different origin
   from `monthavencapital.com`, and passing on one proves nothing about the other unless
   SONA allows both explicitly.

## Step 3: click through on a phone

- The header now says **Call** only. Texting lives in the footer and body copy, because
  the header is one `tel:` anchor and cannot hold two numbers.
- Check the header at 375px.
- `/contact/` shows two numbers in separate blocks and says the split is deliberate.
- `/text/`, `/privacy/`, `/terms/`, `/legal/sms/` all load. These are filed with the
  carriers; if one 404s the toll-free can be flagged.

## Step 4: the two remaining launch blockers

`npm run check:launch` fails until both land, and the deploy workflow now runs it, so
this is enforced rather than remembered.

- **A real seller testimonial.** The Oak Ridge seller. The Thomasville Realtor.com
  review does not count and the build enforces that: it is buyer-side, agent work, and
  90 miles out of area.
- **The Google Business Profile URL**, once verified. This is also the thing that
  decides the local pack, where the competition is 23 to 70 reviews against our zero.

Not blocking, but wanted: the Realtor.com profile URL, so the Thomasville review
renders at all; Alec's individual broker license number; a photo.

## Step 5: going live

`main` is still the old capital-markets site, and **its** workflow uploads the repo
root, which would publish `src/` and `docs/`. The workflow on this branch is correct
and uploads `_site` only. Merging this branch to `main` brings the right workflow with
it, so merge the branch rather than cherry-picking content.

After the first deploy: submit one real lead through the live site and confirm it lands
in SONA. The point of all of this is that a seller never finds the bug first.
