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
| **Primary category** | `Real estate consultant`. See the correction below: `Real estate investor` is not a Google category and typing it blocks the form. |
| **Secondary category** | None. Nothing else in the list is true, and an untrue category dilutes relevance and invites a suspension review. |
| **Address** | **Hidden.** Choose "I deliver goods and services to my customers" and do not display a street address. We buy at the seller's property; there is no office to visit. |
| **Service areas** | Three entries, nothing more:<br>`Gaston County, NC` &middot; `Cleveland County, NC` &middot; `Lincoln County, NC`<br>See the note below before you type anything else into that box. |
| **Phone** | `(704) 481-6298` — the same number on the site. Not the 336, not the 272. |
| **Website** | `https://monthavencapital.com` |
| **Chat / text message** | `(844) 482-9105`, the toll-free. **Not the 704.** See the note below. |
| **Hours** | **Open 24 hours** on the profile. `site.businessHours` deliberately does NOT match, and must not be changed to match. See the note below. |
| **Description** | "We buy houses for cash in Gaston, Cleveland and Lincoln County, North Carolina. Any condition, no repairs, no commission, no closing costs. Written offer within 24 hours." |

### Correction: "Real estate investor" is not a Google category

An earlier version of this file named `Real estate investor` as the primary category. **It does
not exist in Google's taxonomy.** Typing it returns "We didn't understand your category" and
blocks the form, which cost a restart mid-setup.

The category is **`Real estate consultant`**, and the evidence was already in hand. From the
Grover local pack: John Buys Your House (70 reviews), Harmony Home Buyers (64) and J&B
Homebuyers (23) all use exactly that. Every company actually ranking in the pack we are trying
to enter is a Real estate consultant.

It is also the right call on compliance. `Real estate agent` and `Real estate agency` both
assert licensed brokerage, and Monthaven Capital LLC is not a licensed brokerage. Same wall as
"Seller's agent services" on the services screen, which must stay unchecked for the same reason.

### On hours: the profile and the site say different things on purpose

The profile is set to **Open 24 hours**, matching every competitor in the pack. That is a
lead-capture convention, not a claim that somebody picks up at 3am.

**Do not copy that phrase onto the website.** `site.businessHours` reads
"Calls Monday to Saturday, 8am to 8pm ET. Texts answered any time", which is the honest version
of the same thing and is true, because SONA answers texts automatically around the clock while
calls reach a person during real hours. Hours are not part of NAP (name, address, phone), so
the two saying different things costs nothing, whereas promising a human overnight would be a
promise broken on the first 3am call.

### On the chat field: this one has a real trap in it

The setup flow offers "Add chat (optional)" with a Text message option and its own contact
phone number. That number is where Google sends texts from people who find you on Maps or
Search.

**It must be the toll-free, `(844) 482-9105`.** It is the only Monthaven number whose webhook
points at SONA, the system that reads a seller's text and answers it. The 704 goes to the
portal, where nothing replies.

Getting this wrong is worse than leaving chat off entirely, because Google enforces a
**24-hour response standard and auto-disables the message button** if you consistently miss
it. Point it at the 704 and the sequence is: a seller texts, it lands somewhere nobody is
watching, nobody answers, Google turns the button off, and you never find out why. Point it at
the 844 and SONA answers automatically, which is exactly what it was built to do.

This mirrors the website, where the copy is call the 704 and text the 844. Same split, same
reason.

### On service areas: three entries, not twenty-eight

An earlier version of this file told you to enter all 28 towns plus the three counties. That
was wrong and it would have wasted your time on a phone.

**Google caps service areas at 20.** The cap is enforced in the dashboard: the 21st entry
errors and blocks the save. 28 towns plus 3 counties is 31, so the long list was never going to
fit, and you would have found that out after typing twenty of them one at a time.

**Three county entries cover all 28 towns and leave 17 slots spare.** Do not fill the rest.
Testing by Sterling Sky found the service area does not affect ranking for a service-area
business: the map pack runs on relevance, proximity to the searcher, and prominence. Listing a
town in that box does not make you rank in that town, so there is no return on stuffing it. If
you want to move the map pack, the number that does it is the review count in the table below,
where the scoreboard is 23, 64, 70 and zero.

**The towns still matter, just not here.** They matter on the website, where 28 city pages
target `sell my house fast <town>` in organic search. Profile and website are different
surfaces with different mechanics, and confusing the two is what produced the original error in
this file.

Kings Mountain, Shelby, Grover and the rest are all inside one of the three counties, so naming
them individually adds nothing a reader or a crawler can use.

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
