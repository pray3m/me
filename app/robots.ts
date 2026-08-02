import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo"

/**
 * Native App Router robots.txt (replaces next-sitemap). Served at /robots.txt.
 *
 * `host` declares the canonical origin, so the www and http variants Google
 * discovers on its own resolve to one property instead of competing.
 *
 * Nothing is disallowed: /blog and /design carry their own `noindex` in page
 * metadata, which is the stronger signal — a Disallow would stop crawlers
 * reading the page at all, and a page they can't read is a page whose noindex
 * they never see.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  }
}
