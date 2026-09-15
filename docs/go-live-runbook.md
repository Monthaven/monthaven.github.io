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

1. **Confirm SONA is alive.** `curl -X POST <leadEndpoint>` with an empty body. Healthy
   is **400 "Property address is required"**. A 200 means the validator let an empty
   body through and is a bug. A timeout means the tunnel is down.
2. **Submit the form from a real browser**, not curl, with the network tab open.
   - The `OPTIONS` preflight must return 200 with `Access-Control-Allow-Headers:
     Content-Type` and an allowed origin.
   - The POST must go to SONA and return 2xx. **If it fell through to Formspree, the
     seam is broken** and it will look like it works, because the lead still lands
     somewhere.
   - Use **email only, no phone** so no confirmation text goes out. The endpoint
     rejects any 555 exchange.
3. **Check the row landed** in `sfh_leads` with the right city, county and source, and
   that the seller shows on the Caller desk as INTERESTED. Delete the test row.
4. **CORS caveat that matters.** A staging origin is a different origin from
   `monthavencapital.com`. Passing on staging does not prove production passes, unless
   SONA allows both explicitly. Whatever the allowlist is, it needs the production
   origin in it before launch.

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
