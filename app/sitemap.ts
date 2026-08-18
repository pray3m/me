import type { MetadataRoute } from "next"
import { PROJECTS } from "@/data/projects"
import { siteConfig } from "@/lib/seo"

/**
 * Native App Router sitemap (replaces next-sitemap). Served at /sitemap.xml.
 *
 * Routes are listed *explicitly* rather than crawled-then-excluded: a new page
 * stays out of the sitemap until someone decides it belongs there, which is the
 * safer default. /blog and /design are noindex, and the icon/manifest/OG/llms.txt routes
 * are assets, so none of them appear here.
 *
 * No `lastModified`. The build timestamp it would default to claims every page
 * changed on every deploy, and Google discounts the field on sites that do that.
 * Git dates are no better: Vercel shallow-clones, and all project pages come
 * from one data file, so they'd share a date regardless of what actually changed.
 */

/**
 * Plain concatenation, not `new URL()` — the latter turns the home path into
 * `https://premgautam.me/` while `alternates.canonical` in `createMetadata`
 * resolves the same page to `https://premgautam.me`. Google treats those as one
 * URL, but a sitemap that disagrees with its own page's canonical is a needless
 * mixed signal. `siteConfig.url` carries no trailing slash.
 */
const absoluteUrl = (path: string) => `${siteConfig.url}${path}`

/** Canonical indexable routes. Home is "" — see above. */
const STATIC_ROUTES = ["", "/projects", "/about", "/contact", "/dashboard"]

export default function sitemap(): MetadataRoute.Sitemap {
  // Same filter as generateStaticParams in /projects/[slug], so a hidden
  // project can't be advertised to crawlers as a page that then 404s.
  const projectRoutes = PROJECTS.filter((project) => project.is_visible).map(
    (project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
    })
  )

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: absoluteUrl(path),
    })),
    ...projectRoutes,
  ]
}
