import { MetadataRoute } from "next";

const routes = [
  "",
  "/why",
  "/services",
  "/how",
  "/intel",
  "/team",
  "/contact",
  "/legal/terms",
  "/legal/privacy",
  "/legal/accessibility",
  "/legal/sms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://www.monthavencapital.com${route}`,
    changefreq: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
