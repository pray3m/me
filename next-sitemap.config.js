// URL shared with lib/seo (config.ts reads the same file) so it's stated once.
const site = require("./lib/seo/site.json")

module.exports = {
  siteUrl: process.env.SITE_URL || site.url,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // Keep out of the sitemap:
  // - opengraph-image routes are image endpoints, not pages
  // - /design is noindex, so listing it would be a contradictory signal
  // - /blog is noindex until real posts are published
  // - manifest.webmanifest is a PWA manifest, not a page
  exclude: [
    "/blog",
    "/design",
    "/manifest.webmanifest",
    "/opengraph-image",
    "/projects/*/opengraph-image",
  ],
}
