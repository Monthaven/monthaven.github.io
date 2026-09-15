// Eleventy config for monthavencapital.com
//
// Everything on this site is generated from data files in src/_data/.
// To add a city: add one object to src/_data/cities.json and push. That's it.
// You should never need to edit this file to add content.

export default function (eleventyConfig) {
  // ---------------------------------------------------------------------------
  // Passthrough: files copied to _site/ as-is
  // ---------------------------------------------------------------------------
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  // CNAME claims monthavencapital.com. A staging build must never ship it: two Pages
  // sites claiming the same custom domain will fight over it.
  if ((process.env.SITE_ENV || "production").toLowerCase() !== "staging") {
    eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  }
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });

  // ---------------------------------------------------------------------------
  // Markdown: wrap tables so they scroll instead of overflowing on a phone.
  // Nunjucks templates do this by hand with .table-scroll; markdown can't, so
  // the renderer does it here and blog tables behave like every other table.
  // ---------------------------------------------------------------------------
  eleventyConfig.amendLibrary("md", (md) => {
    md.renderer.rules.table_open = () => '<div class="table-scroll"><table>';
    md.renderer.rules.table_close = () => "</table></div>";
  });

  // ---------------------------------------------------------------------------
  // Filters
  // ---------------------------------------------------------------------------

  // Absolute URL for canonicals, og:url, schema @id. Never hand-type these.
  eleventyConfig.addFilter("absoluteUrl", function (path, base) {
    if (!path) return base;
    if (/^https?:\/\//.test(path)) return path;
    return new URL(path, base).href;
  });

  eleventyConfig.addFilter("usd", function (n) {
    if (n === null || n === undefined || n === "") return "";
    return "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
  });

  eleventyConfig.addFilter("json", function (value) {
    // JSON-LD safe: escape the sequences that can break out of a <script> block.
    return JSON.stringify(value, null, 2)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026");
  });

  eleventyConfig.addFilter("isoDate", function (d) {
    return new Date(d || Date.now()).toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("readableDate", function (d) {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // Look up city objects by slug — used for "we also buy near {city}" linking.
  eleventyConfig.addFilter("citiesBySlug", function (cities, slugs) {
    if (!slugs) return [];
    return slugs.map((s) => cities.find((c) => c.slug === s)).filter(Boolean);
  });

  eleventyConfig.addFilter("findBySlug", function (list, slug) {
    return (list || []).find((x) => x.slug === slug);
  });

  eleventyConfig.addFilter("where", function (list, key, value) {
    return (list || []).filter((x) => x[key] === value);
  });

  // Testimonials/case studies attached to a city, falling back to general ones.
  eleventyConfig.addFilter("forCity", function (list, citySlug) {
    const specific = (list || []).filter((x) => x.citySlug === citySlug);
    return specific.length ? specific : [];
  });

  eleventyConfig.addFilter("limit", function (list, n) {
    return (list || []).slice(0, n);
  });

  // ---------------------------------------------------------------------------
  // Collections
  // ---------------------------------------------------------------------------
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // ---------------------------------------------------------------------------
  // Concatenate src/css/** into a single stylesheet, inlined by the base layout.
  // Numeric prefixes control cascade order; no bundler, no PostCSS.
  // ---------------------------------------------------------------------------
  eleventyConfig.addGlobalData("eleventyComputed.nothing", () => null);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/",
  };
}
