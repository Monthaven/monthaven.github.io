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
| **Service areas** | Gastonia · Shelby · Kings Mountain · Belmont · Mount Holly · Bessemer City · Cherryville · Dallas · Stanley · Lincolnton, plus Gaston County, Cleveland County, Lincoln County |
| **Phone** | `(704) 481-6298` — the same number on the site. Not the 336, not the 272. |
| **Website** | `https://monthavencapital.com` |
| **Hours** | Mon–Sat 8:00am–8:00pm (must match `site.businessHours`) |
| **Description** | "We buy houses for cash in Gaston, Cleveland and Lincoln County, North Carolina. Any condition, no repairs, no commission, no closing costs. Written offer within 24 hours." |

## After it's verified

1. Put the profile URL into `src/_data/site.json` → `social.gbp`. It flows into `sameAs` in the
   `LocalBusiness` schema automatically and clears the last NAP launch blocker.
2. Add photos — your face, and any before/after property shots. Profiles with real photos
   outperform empty ones by a wide margin.
3. Ask every seller you close with for a review. Reviews are the single biggest map-pack
   ranking factor and the thing J&B's six-year head start actually consists of.

## NAP consistency

The business name, the phone number, and the hours must be **identical** on the site, the
GBP, and anywhere else you get listed. Not "similar" — identical. `scripts/check-content.mjs`
enforces the phone's area code; the rest is on you.
