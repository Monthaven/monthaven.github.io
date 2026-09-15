# The 40 people you never asked

## Why this is the most valuable page in `docs/`

Last round I looked at the live Google results for Grover and reported that the local pack —
the "Businesses" block a seller actually clicks — is fed only by Google Business Profiles, and
that the scoreboard reads:

| Business | Reviews |
|---|---|
| John Buys Your House | 70 |
| Harmony Home Buyers | 64 |
| J&B Homebuyers | 23 |
| **Monthaven** | **0** |

I said the profile was the gap, not the website. Then you told me you'd **forgotten to ask for
reviews.**

Six years licensed. 40+ transactions. Top Producer and #1 Rookie. Roughly forty people who
already know you, already trust you, and have never once been asked.

**That is the answer to the table above, and you have been sitting on it the whole time.** It
is not a content problem and it is not a code problem. It is a fortnight of text messages, and
it is worth more than anything else currently on my list.

---

## The one caveat, stated honestly

Your past clients were **agent-side**. The new Google Business Profile is for a house-buying
business. Google removes reviews that don't reflect genuine experience with the business being
reviewed, and a wave of vague five-star reviews landing on a brand-new profile in one afternoon
is the classic pattern its filters look for.

So this has to be done properly or it does real damage:

- **Ask them to describe what actually happened.** "Alec helped us buy a house in 2023 and…" is
  genuine experience with you, and it sits properly under the profile's *Real estate consultant*
  secondary category. A generic "great service, highly recommend" from someone who never
  transacted reads as manufactured, because it is indistinguishable from manufactured.
- **Spread it out.** Ten honest reviews over three weeks beats forty in one day. The second
  version gets filtered and can put a new profile at risk.
- **Never offer anything for a review.** NCREC requires disclosing compensated testimonials, and
  Google prohibits incentivized ones outright. The simplest way never to have that problem is
  never to create it.
- **Ask, and then leave it.** One follow-up at most. A review chased twice is worth less than no
  review.

---

## Two different asks. Only one of them needs the GBP.

An earlier version of this file said not to send a single message until the Google
profile was verified. That is right for Google reviews and **wrong for the thing
actually blocking launch**, and the conflation cost time.

| Ask | Needs the GBP? | Blocks |
|---|---|---|
| A **website testimonial** for `proof.json` | **No.** A text and a reply, nothing else. | `npm run check:launch`, so going live |
| A **Google review** | **Yes**, verification must be finished | The local pack |

Send the two below today. Google waits for verification.

---

## Send today: the two people most likely to say yes

Neither of these needs the profile. Both clear the launch blocker outright.

### 1. The Oak Ridge seller

The cat-urine house is already published as a closed deal on `/reviews/`. Two or three
sentences and a first name is all `proof.testimonials` needs, and it is the single
highest-value text message available right now.

> Hey [name], it's Alec. Hope the move went smoothly and you're settled.
>
> Quick favor if you have two minutes. I've started my own company and I'm building
> the website. Would you be alright with me quoting a couple of lines from you about
> what the sale was like? Just what you actually remember, good or bad. I'd use your
> first name only, nothing else.
>
> No worries at all if you'd rather not.

When they reply, send me the quote and the first name and I will put it live.

### 2. The Thomasville couple

They already wrote you five stars on Realtor.com without being asked, so they are the
warmest name you have. This ask is narrower: permission to quote what they already
wrote, plus a first name. That also fills the `reviewerName` currently sitting null in
`proof.agentReviews`.

> Hi [name], it's Alec Clausen. I hope the house is still treating you well.
>
> You left me a review on Realtor.com back in 2023 and I've never properly thanked you
> for it. I'm building a website for my own company now. Would you mind if I quoted it,
> with your first name? And if you'd rather I didn't, that's completely fine.

While you're there, ask for the profile URL if you don't have it to hand. The review
does not render without a link to its source.

**Neither message offers anything in return.** NCREC requires disclosing compensated
testimonials, and the simplest way never to have that problem is never to create one.

---

## The Google campaign: after verification

The profile has to exist before anyone can review it. `docs/gbp-setup.md` has the exact fields.
**Do not send a single one of these texts until the GBP is verified and you have the review
link in hand.** To be precise about which step that is: creating the profile and filling in the
service areas is not the gate. **Verification is** — the postcard, phone or video step where
Google confirms the business is real. A profile that exists but is unverified does not show in
the map pack and cannot collect reviews, so a request sent before then has nowhere to land, and a request that lands somewhere confusing gets ignored, and you only get to ask
these people once.

Grab the short review link from the profile dashboard ("Ask for reviews" → copy link).

---

## Who to ask, in what order

**Start with the people who will say yes fastest**, because the first few reviews are the
hardest and everything gets easier once the profile isn't empty.

1. **The Hurricane Ian couple in Thomasville.** They already wrote you a five-star Realtor.com
   review unprompted. They are the single most likely yes on the list, and while you're there,
   ask if you can use their first name on the site.
2. **Anyone whose closing you remember as genuinely good.** You'll know the names without
   looking.
3. **The 2023–2024 Top Producer run.** Recent enough that they remember you clearly.
4. **Everyone else, oldest last.**

---

## The text

Short. No pitch, no link-dump, no explanation of your new business model.

> Hey [name] — Alec Clausen. Hope you're doing well and still happy in the house.
>
> Quick favor, and no worries at all if you'd rather not: I've started my own company and I'm
> building it up from scratch. If you've got two minutes, a short Google review about working
> with me would genuinely help.
>
> [link]
>
> Thanks either way — good to hear from you regardless.

## The email, if a text is too familiar

> Subject: A quick favor, if you have two minutes
>
> Hi [name],
>
> It's Alec Clausen — I helped you [buy/sell] [the house on X Street] back in [year]. I hope
> it's all still going well.
>
> I've started my own company here in Gaston County and I'm building the reputation side of it
> from nothing. If you'd be willing to leave a short Google review about what it was like
> working with me, it would make a real difference. Just what you actually remember — honest is
> more useful to me than glowing.
>
> [link]
>
> No obligation at all, and either way it was good working with you.
>
> Alec

---

## Answer to "what should I say?"

Some will ask. Don't write it for them — a review you drafted reads like a review you drafted.
Give them a prompt instead:

> Honestly just whatever you remember. What the situation was, what I did, whether it worked
> out. Two or three sentences is plenty.

---

## The standing fix

There are zero reviews today because there was never a step in the process that asked for one.
Add it: **at closing, every time, forever.** Ask while they're happy and you're in front of
them, then send the link the same afternoon.

Every one of the three competitors above got their number by doing this consistently for years.
There is no shortcut and there doesn't need to be one — you have a six-year head start you
never collected on.

---

## Track it here

| Date | Name | Deal | Asked | Posted |
|---|---|---|---|---|
| | | | | |
