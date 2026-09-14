// Directory data for hand-written pages.
//
// Default permalink: every page becomes /<slug>/index.html so all URLs carry a
// trailing slash and resolve on GitHub Pages without a server rule. Individual
// pages override `permalink` in front matter when they need a fixed path
// (the four A2P-frozen URLs do exactly that).
export default {
  layout: "layouts/base.njk",
  // A page's own front-matter `permalink` wins over this (template data outranks
  // directory data in the cascade), which is how the A2P-frozen URLs pin themselves.
  permalink: (data) => `/${data.page.fileSlug}/index.html`,
  eleventyComputed: {
    // Pages that set `useGeneralFaqs: true` get the shared FAQ list, which the
    // layout also turns into FAQPage schema. One source, so the rendered
    // questions and the structured data cannot disagree.
    faqItems: (data) => {
      if (data.faqItems) return data.faqItems;
      if (data.useGeneralFaqs) {
        return data.faqLimit
          ? data.faqs.general.slice(0, data.faqLimit)
          : data.faqs.general;
      }
      return [];
    },
  },
};
