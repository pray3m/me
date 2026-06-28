# lib/seo

Centralized SEO metadata and structured data for the App Router. Pages declare
intent (title, description, path); this module derives the matching canonical,
Open Graph, and Twitter tags so they can't drift apart.

## Files

| File | Exports | Role |
| --- | --- | --- |
| `config.ts` | `siteConfig`, `siteName` | Edit this when reusing the module: site name, default title/description, socials, twitter handle. |
| `site.json` | (data) | Holds the URL only. Shared with `next-sitemap.config.js`, which is CommonJS and can't import `config.ts`. `SITE_URL` env overrides it. |
| `metadata.ts` | `rootMetadata`, `createMetadata()` | `rootMetadata` = the set-once layout metadata (metadataBase, title template, robots defaults). `createMetadata()` = per-page factory. |
| `structured-data.ts` | `rootGraph()`, `breadcrumbSchema()` | JSON-LD builders. `rootGraph` = Person + WebSite. `breadcrumbSchema` = a BreadcrumbList. |
| `json-ld.tsx` | `JsonLd` | Renders a `<script type="application/ld+json">`. The single place that uses `dangerouslySetInnerHTML`. |
| `og.tsx` | `ogCard()`, `OG_SIZE`, `OG_CONTENT_TYPE` | Shared branded Open Graph card + dimensions for the `opengraph-image` routes. Import directly (`@/lib/seo/og`), not via the barrel. |
| `index.ts` | (barrel) | Import everything from `@/lib/seo`. |

## Usage

Root layout — set the base metadata and the site-wide graph once:

```tsx
import { JsonLd, rootGraph, rootMetadata } from "@/lib/seo"

export const metadata = rootMetadata

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <JsonLd data={rootGraph()} />
        {children}
      </body>
    </html>
  )
}
```

A static page — one call covers title, description, canonical, OG, and Twitter:

```tsx
export const metadata = createMetadata({
  title: "About",          // <title> becomes "About · {name}" via the template
  description: "...",      // unique per page
  path: "/about",          // canonical + og:url, resolved against metadataBase
})
```

A dynamic page — `generateMetadata` plus a breadcrumb:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) return createMetadata({ title: "Not Found", noIndex: true })
  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    type: "article",
  })
}

// inside the component
<JsonLd data={breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: project.title, path: `/projects/${slug}` },
])} />
```

## `createMetadata` options

- `title?` — page title. The layout template appends `· {name}`. Omit on the home page to use the default title.
- `description?` — defaults to `siteConfig.description`.
- `path?` — canonical path, e.g. `/about`. Defaults to `/`.
- `type?` — `"website"` (default) or `"article"`.
- `noIndex?` — when true, emits `robots: noindex, follow`.

## Reusing in another project

1. Copy the `lib/seo/` folder.
2. Edit `config.ts` (fields) and `site.json` (the URL).
3. Use `rootMetadata` + `<JsonLd data={rootGraph()} />` in the layout, and
   `createMetadata()` on pages.

## Notes

- This module does **not** generate OG images. Those come from Next's
  `opengraph-image` file convention (`app/opengraph-image.tsx`,
  `app/projects/[slug]/opengraph-image.tsx`); Next merges the resulting
  `og:image` / `twitter:image` tags in automatically.
- `metadataBase` (set in `rootMetadata`) is what lets `path` be relative.
- The title `template` applies to the `<title>` only, not to `og:title`.
- A page's `openGraph` from `createMetadata` replaces the layout's `openGraph`
  rather than merging — that's intended, so each page gets accurate OG values.
