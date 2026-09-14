export default {
  layout: "layouts/post.njk",
  pageType: "post",
  ogType: "article",
  permalink: (data) => `/blog/${data.page.fileSlug}/index.html`,
  eleventyComputed: {
    faqItems: (data) => data.faq || [],
    breadcrumbs: (data) => [
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog/" },
      { name: data.title, url: data.page.url },
    ],
  },
};
