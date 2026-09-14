# Working on this repo

This site does not stand alone. It is the front door of a running system, and
the seams below are the parts you cannot see from inside this repo. Everything
here was verified against the live system on 2026-09-14, not inferred.

Two agents work on this repo. Content, design, copy, SEO and page structure are
open. The seams in this file are shared state: change one and you change how a
real seller reaches a real person. If you need to change one, say so in the PR
body rather than doing it quietly.

## Where a lead goes

`src/_data/site.json` → `leadEndpoint` posts to **SONA**, Monthaven's own intake
(`/api/sms/web-lead`). It is not a form service. It creates the lead row,
records TCPA consent evidence, puts the seller on the Caller desk as
INTERESTED, texts them a confirmation and alerts Alec's phone. Formspree is
`leadEndpointFallback` and nothing more.

Three rules hold this together:

1. **The primary POST must be JSON.** SONA parses JSON and urlencoded bodies,
   never multipart. A bare `FormData` handed to `fetch()` sends multipart, so
   every field arrives empty and nothing errors anywhere. `src/js/main.js`
   serializes to JSON for the primary and keeps `FormData` for the Formspree
   fallback, which wants multipart. Do not "simplify" these into one path.
2. **Fail over on transport and 5xx only.** A 4xx means SONA received it and
   rejected it on purpose (bot trap, fill-time floor, rate limit, bad input).
   Re-posting that to Formspree just duplicates a bad lead.
3. **Keep the fallback.** SONA runs on a box in Alec's house behind a
   Cloudflare tunnel. If that box is down the primary fails and the browser
   re-posts to Formspree instead of losing the lead.

To check the endpoint is alive, POST an empty body to it. A healthy endpoint
answers **400 "Property address is required"** and creates nothing. A 200 would
mean the validator let an empty body through, which is a bug. SONA's monitor
runs exactly this probe every 30 minutes and pages Alec after two misses.

If you need a test lead, send **email only with no phone**. No phone means no
text goes out. The endpoint rejects any 555 exchange, so test numbers of the
`999-555-xxxx` shape will not work.

## The phone numbers are not interchangeable

Monthaven owns four Twilio numbers. Only one of them reaches the system that
reads and answers seller texts:

| Number | Where its webhooks point |
|---|---|
| **(844) 482-9105** toll-free | **SONA** — the machine that reads and replies |
| (704) 481-6298 "Big Bro", Shelby | the portal, a different system |
| (704) 850-9041 "Lil Bro", Monroe | the portal |
| (272) 777-1020 | the portal |

`site.smsRaw` / `site.smsDisplay` is the toll-free. It is the number registered
with the carriers for A2P messaging and the one filed on the consent page. A
text sent to any other number lands in a different inbox from the one that
replies.

**Open question for Alec, not for either agent to decide:** most of the site
says "call or text (704) 481-6298". A text there is not lost, but it lands in
the portal rather than the machine. The fix is one of two things and they point
opposite ways: repoint the 704's SMS webhook at SONA so the copy becomes true,
or split every mention into call-one-number, text-the-other. A few pages
already do the split. Do not standardize this in either direction until Alec
picks one.

## Frozen URLs

`/text/`, `/privacy/`, `/terms/` and `/legal/sms/` are filed with the carriers
as proof-of-consent URLs for the toll-free campaign. Carriers re-check them. If
one 404s or redirects, the number can be flagged or shut off. `check-links.mjs`
fails the build if any of them moves. The `opt_in_url` hidden field on the
opt-in form must keep its exact value.

## Branches and deploying

- **`main` is live.** GitHub Pages publishes it to monthavencapital.com on
  every push.
- **`main` is still the old capital-markets site**, and its deploy workflow
  uploads the repo root. Pushing this Eleventy rebuild to `main` without also
  taking this branch's `.github/workflows/static.yml` would publish `src/` and
  break the site. The workflow on this branch is already correct: it runs
  `npm ci && npm run build && npm run check` and uploads `_site` only.
- Work on a branch. Going live is Alec's call.

Before any push: `npm run build && npm run check`. Both gates block on dead
links, missing assets, canonical and sitemap disagreement, a published internal
doc, or a missing frozen URL.

## The launch gate is real

`npm run check:launch` fails until `src/_data/proof.json` carries real,
verifiable material: closed-deal case studies, testimonials, a team bio and
photo, verified value-stack figures, a confirmed guarantee, and the Google
Business Profile URL. **Nothing in that file may be invented.** These are
Alec's to supply. The site builds and is reviewable without them; it is not
launchable.

## House style

No em dashes and no curly quotes in seller-facing copy. It reads robotic and it
is a standing rule across everything Monthaven sends. There are still 67 em
dashes in the templates and blog posts from earlier rounds; cleaning them is
welcome.
