// FAQs must reach the LAYOUT so FAQPage schema can be emitted in <head>.
// Passing them through YAML front matter would stringify the array, so they
// come through eleventyComputed instead. The page body renders the same
// situation.faq array, so schema and visible content cannot drift.
export default {
  eleventyComputed: {
    faqItems: (data) => (data.situation ? data.situation.faq : []),
  },
};
