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
  // - icon.png / apple-icon.png are favicon assets from the app/ file convention
  exclude: [
    "/apple-icon.png",
    "/blog",
    "/design",
    "/icon.png",
    "/manifest.webmanifest",
    "/opengraph-image",
    "/projects/*/opengraph-image",
  ],
  changefreq: "weekly",
  // Rank the pages that matter above the rest: home first, then the work under
  // /projects, everything else default.
  transform: async (config, path) => ({
    loc: path,
    changefreq: config.changefreq,
    priority:
      path === "/"
        ? 1
        : path === "/projects" || path.startsWith("/projects/")
          ? 0.8
          : 0.6,
    lastmod: new Date().toISOString(),
  }),
}
