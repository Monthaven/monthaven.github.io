// Per-city computed data for src/generate/city.njk.
//
// FAQs live here rather than in the template because they must be available to
// the LAYOUT (which emits FAQPage schema in <head>), and a {% set %} inside the
// child template does not reach the layout's context.
//
// Rule: whatever renders on the page must match what goes into the schema.
// Both read from this one array, so they cannot drift.

export default {
  eleventyComputed: {
    faqItems: (data) => {
      const c = data.city;
      const s = data.site;
      if (!c) return [];
      return [
        ...(c.cityFaq || []),
        {
          q: `How fast can you buy my house in ${c.name}?`,
          a: `We give you a written offer within ${s.offerWindowHours} hours of seeing the property, and we typically close in ${s.closeDaysMin} to ${s.closeDaysMax} days. What sets the floor is the title search and the closing attorney's calendar, not our funding. If you have a hard deadline in ${c.name}, such as a foreclosure sale date or a job start date, tell us on the first call and we will tell you honestly whether we can make it.`,
        },
        {
          q: `Do I have to make repairs or clean the house out?`,
          a: `No. We buy houses in ${c.name} exactly as they stand. No roof, no HVAC, no paint, no carpet, no cleaning. Take what matters to you and leave everything else where it is. Cleanout is our cost and it is included in the offer rather than deducted from it.`,
        },
        {
          q: `What fees or commissions will I pay?`,
          a: `None. There is no commission, no buyer's fee, and no service charge, and we pay the standard seller closing costs including the attorney fee, title work, recording fees, and North Carolina transfer tax. The number on the offer is what you walk away with, less only your loan payoff and any liens on the property.`,
        },
        {
          q: `Will you pay market value for my ${c.name} house?`,
          a: `No, and no cash buyer will. We buy houses that need work, at a price that leaves room to do the work. What you get instead is certainty, speed, no repairs, no commission, no closing costs, and no financing contingency that can collapse two weeks before closing. If your house shows well and you have three months, listing it with a ${c.county} County agent will probably net you more, and we will tell you that on the call.`,
        },
        {
          q: `Who handles the closing?`,
          a: `A North Carolina closing attorney. North Carolina requires attorney-supervised real estate closings, which works in your favor: an independent attorney searches title at the Register of Deeds, identifies every lien, and disburses the funds. You are welcome to use your own attorney.`,
        },
        {
          q: `Do you actually buy in ${c.name}, or just advertise there?`,
          a: `We buy in ${c.name} and throughout ${c.county} County. Someone from Monthaven walks the property in person. We do not make sight-unseen offers from a spreadsheet and then re-trade you after the walkthrough.`,
        },
        {
          q: `Can I sell if the house has tenants, or if I am behind on payments?`,
          a: `Yes to both. We buy tenant-occupied properties without requiring you to evict or turn the unit, and we buy houses in pre-foreclosure right up to the sale date. Delinquent property taxes and liens are paid from the proceeds at closing and rarely stop a sale.`,
        },
      ];
    },
  },
};
