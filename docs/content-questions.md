# Voice memo questions for Alec

**How to use this:** one memo per question. Don't prepare, don't script, don't worry about
rambling — rambling is the point. Say the address, say the number, say what the person
actually said on the phone. Specifics are the whole value; I can't invent them and neither
can J&B.

Record on your phone, name the file with the question number, send them however is easiest.
Two or three a day gets us through this in two weeks.

**One rule:** if you can't remember whether something is true, say so in the memo. I will
not publish anything you flagged as uncertain, and a hedge from you costs nothing while a
wrong fact on a live page costs a lot.

**Q25–Q29 are done and the About page is written.** Next up: **Q1–Q5** (case studies — unblocks the biggest remaining launch blocker), then **Q16–Q20** (local detail for the city pages).

**Original priority order:** start with **Q25–Q30** (that's the About page and
the single biggest trust signal on the site), then **Q1–Q5** (case studies), then
**Q16–Q20** (the local content that pushes the city pages apart).

---

## Group 1 — War stories → becomes `proof.caseStudies` and blog posts

These are the highest-value memos. Real addresses, real numbers, real outcomes.

1. **Walk me through the last house you bought, start to finish.** How they found you, what
   the house was like when you walked in, what you offered, what they said, how long it took
   to close, what they walked away with.
2. **The worst title problem you've hit.** What surfaced, when it surfaced, and how it
   resolved — or didn't.
3. **A deal that fell apart.** Why. What you'd do differently. (This is worth more to a
   skeptical seller than three success stories.)
4. **The house that was worse inside than anyone expected.** What was actually wrong with
   it, what it cost to fix, whether you still made money.
5. **A seller you told to list instead of selling to you.** What made it obvious, what you
   said, what happened to them.

## Group 2 — The math → expands `/how-it-works/` and `/blog/how-much-do-cash-home-buyers-pay-nc/`

6. **Price a real house out loud.** Pick one you actually bought. ARV, repair estimate,
   carrying costs, your margin. Say the four numbers and how you got each.
7. **Where do other buyers pad the repair estimate?** What lines get inflated, and how would
   a seller catch it?
8. **What does it actually cost you to hold a house** while the work is done, in this market?
9. **What's the smallest margin you'd take**, and what makes a deal not worth doing at all?
10. **What do sellers get wrong about what their house is worth?** Where does the Zillow
    number come from and why is it wrong on these houses specifically?

## Group 3 — Seller situations → expands the seven situation pages

11. **What does someone facing foreclosure sound like on the first call?** What are they
    afraid of, what do they already know, what do they have wrong?
12. **What do heirs argue about?** What breaks a family deal, and what have you seen fix one?
13. **What's the most common thing a tired landlord says** right before they decide to sell?
14. **Divorce sales** — what's different about handling those, and what do you refuse to get
    in the middle of?
15. **Someone calls with a house that's been vacant for years.** What do you expect to find,
    and what does it do to the number?

## Group 4 — Local knowledge → rewrites the per-city sections

**This is the group that matters most for rankings.** Right now the ten city pages are 69.7%
similar to each other, against a 72% ceiling that fails the build. Every specific local fact
you give me pushes that number down and pushes the pages up. Generic copy is what every
competitor has; this is what none of them do.

16. **What's specifically wrong with mill-village houses?** Loray, Margrace, the Shelby mill
    housing — what do you find every single time?
17. **Which Gaston or Cleveland County neighborhoods surprise people on price**, in either
    direction?
18. **Go city by city** — Gastonia, Shelby, Kings Mountain, Belmont, Mount Holly, Bessemer
    City, Cherryville, Dallas, Stanley, Lincolnton. For each: what kind of house is it, who
    is selling, what's the recurring problem? One memo per city is fine and probably better.
19. **What's different about the west side of the county** versus the Charlotte-commuter side?
20. **What's changed around Kings Mountain since the casino?** What are you actually seeing
    in offers and in what people expect?

## Group 5 — The industry → becomes the competitor-comparison posts that get cited by AI

21. **What do you wish sellers knew about cash buyers** that none of us say out loud?
22. **How does a lead broker actually work?** What happens to someone's phone number after
    they fill out one of those forms?
23. **What are the mailer companies doing** in Kings Mountain and Cherryville, and how should
    somebody read one of those letters?
24. **Who else is genuinely good in this market,** and what are they better at than you?
    (I'm publishing this honestly — it's why ChatGPT cites J&B and not us.)

## Group 6 — You → becomes `/about/` and `proof.team`  ✅ ANSWERED, page is live

**Do these first if you do nothing else.** The About page is currently empty and it is the
single biggest E-E-A-T signal the site has. It needs to be in your voice, first person.

25. **Why this business?** Not the polished version. What were you doing before and what
    made you do this instead?
26. **Why Gaston and Cleveland County** specifically?
27. **What will you not do?** What have you turned down, and what would make you walk away
    from a deal that was otherwise fine?
28. **What do you want someone to feel** after they hang up the phone with you, even if they
    never sell you the house?
29. **What's your actual background** — licenses, how long, what you've closed, anything that
    makes you credible to someone who has never heard of you?
30. **What's the thing you'd want said about you** by a seller two years after the closing?

---

## Also needed, whenever you get to it

- **Photos of you.** Headshot or working — on a porch, in a house, doesn't matter. A real
  face beats a stock photo by a mile and stock photos on these pages actively hurt.
- **Property photos** from houses you've bought, before and after if you have them.
- **Screenshots of any texts or reviews** from sellers, plus their OK to publish. First name
  and city is enough; no last names needed.
- **Your NC license number**, once the firm license is placed with the LLC.
- **The local Twilio number** — the digits. It replaces (272) 777-1020 on the site with one
  line of config, and (272) stays for mail and cold calling.
- **Google Business Profile URL**, and the business name and phone exactly as they appear
  there.

## Where each answer ends up

| Group | Lands in |
|---|---|
| 1 — War stories | `src/_data/proof.json` → `caseStudies`; `/reviews/`; new blog posts |
| 2 — The math | `/how-it-works/`; `/blog/how-much-do-cash-home-buyers-pay-nc/` |
| 3 — Situations | the seven `/sell-house-*` pages; `src/_data/situations.json` |
| 4 — Local | `src/_data/cities.json` → `housingStock`, `localChallenges`, `sellerProfile`, `cityFaq` |
| 5 — Industry | `/blog/best-cash-home-buyers-*` comparison posts |
| 6 — You | `/about/`; `src/_data/proof.json` → `team` |
