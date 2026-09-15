// Build environment. Drives three things: whether internal review notices render,
// whether the build is crawlable, and whether the CNAME ships.
//
// The default is PRODUCTION, deliberately. Fail-safe means a build with no env var
// set never leaks internal copy to a visitor. Every one of the 63 pages was doing
// exactly that: rendering a dashed orange box addressed to Alec by name, telling him
// to add real testimonials to src/_data/proof.json.
//
//   (unset)             production  - no review notices, crawlable, CNAME ships
//   SITE_ENV=review     local work  - review notices visible, otherwise production
//   SITE_ENV=staging    staging     - review notices visible, noindex everything,
//                                     no CNAME, robots.txt disallows all
const SITE_ENV = (process.env.SITE_ENV || "production").toLowerCase();

export default {
  name: SITE_ENV,
  production: SITE_ENV === "production",
  staging: SITE_ENV === "staging",
  // Review notices are build scaffolding, not copy. Anywhere but production.
  showReviewNotices: SITE_ENV !== "production",
};
