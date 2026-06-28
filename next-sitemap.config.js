// URL shared with lib/seo (config.ts reads the same file) so it's stated once.
const site = require("./lib/seo/site.json")

module.exports = {
  siteUrl: process.env.SITE_URL || site.url,
  generateRobotsTxt: true,
  // Keep out of the sitemap:
  // - opengraph-image routes are image endpoints, not pages
  // - /design is noindex, so listing it would be a contradictory signal
  exclude: ["/design", "/opengraph-image", "/projects/*/opengraph-image"],
}
