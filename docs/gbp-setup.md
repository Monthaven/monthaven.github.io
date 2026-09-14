# Google Business Profile setup — Monthaven Home Buyers

**Create a NEW profile.** Do not rename or move the existing one.

## Why a second profile

The existing profile is a different business in Google's eyes:

| | Existing profile | What this site needs |
|---|---|---|
| Name | Alec Clausen Real Estate | Monthaven Home Buyers |
| Category | Real estate agent | Real estate investor |
| Market | Greensboro / Oak Ridge (Triad) | Gaston / Cleveland / Lincoln |
| Phone | (336) 508-6695 | (704) 481-6298 |

Pointing this site at the Greensboro agent profile creates a name, category, city **and**
area-code mismatch. It will not win the Gastonia map pack and the inconsistent NAP can
suppress the site. Keep the agent profile for Greensboro work; this is a separate business.

## Exact fields

A GBP is painful to change after verification, so get these right the first time.

| Field | Value |
|---|---|
| **Business name** | `Monthaven Home Buyers` — character for character, matching `site.name`. No "LLC", no city, no keywords. Keyword-stuffed names get suspended. |
| **Primary category** | `Real estate investor`. Fall back to `Property management company` if unavailable. **Not** "Real estate agent" — that's the other profile and the wrong search intent. |
| **Secondary category** | `Real estate consultant` (optional) |
| **Address** | **Hidden.** Choose "I deliver goods and services to my customers" and do not display a street address. We buy at the seller's property; there is no office to visit. |
| **Service areas** | All 28 towns the site builds a page for, plus Gaston County, Cleveland County and Lincoln County:<br>Gastonia · Shelby · Kings Mountain · Belmont · Mount Holly · Bessemer City · Cherryville · Dallas · Stanley · Lincolnton · McAdenville · Cramerton · Lowell · Ranlo · High Shoals · Boiling Springs · Grover · Kingstown · Lattimore · Fallston · Lawndale · Casar · Belwood · Patterson Springs · Polkville · Denver · Iron Station · Vale |
| **Phone** | `(704) 481-6298` — the same number on the site. Not the 336, not the 272. |
| **Website** | `https://monthavencapital.com` |
| **Hours** | **Open 24 hours.** See the note below — this is a change from what was here, and it requires `site.businessHours` to change too. |
| **Description** | "We buy houses for cash in Gaston, Cleveland and Lincoln County, North Carolina. Any condition, no repairs, no commission, no closing costs. Written offer within 24 hours." |

### On hours: every competitor is open 24 hours

Checked September 2026 against the Google local pack for "sell my house fast Grover NC":
J&B Homebuyers, John Buys Your House and Harmony Home Buyers **all** show *Open 24 hours*.
Not one shows business hours.

That is not a claim to answer the phone at 2am. In this category it is a lead-capture setting:
it keeps the profile eligible for after-hours searches, and a distressed seller — foreclosure,
a death in the family, a tenant problem — very often searches at night. A profile showing
"closed" at the moment somebody is ready to call is the one they scroll past.

If you set this, `site.businessHours` in `src/_data/site.json` must change to match, or NAP
consistency breaks. If you would rather show real hours, that is a defensible choice — just
know you are the only one on the map doing it.

## After it's verified

1. Put the profile URL into `src/_data/site.json` → `social.gbp`. It flows into `sameAs` in the
   `LocalBusiness` schema automatically and clears the last NAP launch blocker.
2. Add photos — your face, and any before/after property shots. Profiles with real photos
   outperform empty ones by a wide margin.
3. Ask every seller you close with for a review. Reviews are the single biggest map-pack
   ranking factor and the thing a competitor's head start actually consists of.

## The competitive picture, as of September 2026

From the live local pack on "sell my house fast Grover NC". **These numbers move — re-check
them rather than trusting this table in three months.**

| Business | Base | Years | Reviews | Hours |
|---|---|---|---|---|
| John Buys Your House | Charlotte | 10+ | 70 | 24h |
| Harmony Home Buyers | Charlotte | 7+ | 64 | 24h |
| J&B Homebuyers | Shelby | 7+ | 23 | 24h |
| **Monthaven** | **Gaston County** | **new** | **0 — no profile yet** | **—** |

**Read this honestly: the profile is the gap, not the website.** The local pack is fed only by
Google Business Profiles. None of the 80 pages on this site can rank in that block, and that
block is where a Grover seller clicks first. Getting verified and getting the first five reviews
changes this SERP more than any further content work will.

Two other things on that page worth knowing:

- **Mark Spain Real Estate** is buying paid placement on these searches out of a Charlotte
  office, with a 4.0 rating on 4 reviews. Weaker local trust signal than any of the three above,
  despite the ad spend. Relevant, since the plan has been to do what Mark Spain does — the ads
  are the easy half to copy and the reviews are the half that actually ranks.
- **Livlyte** is advertising *"Don't sell cash — get 90% of full market value, 15 days or less,
  no closing costs."* That is essentially the Two-Number Promise as somebody else's paid
  headline. Worth watching while that flag is still off.

## NAP consistency

The business name, the phone number, and the hours must be **identical** on the site, the
GBP, and anywhere else you get listed. Not "similar" — identical. `scripts/check-content.mjs`
enforces the phone's area code; the rest is on you.
