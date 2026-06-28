import type { Metadata } from "next"
import { siteConfig, siteName } from "./config"

/**
 * Root metadata for the app's top-level layout. Holds the things that should be
 * set exactly once: metadataBase, the title template, and sensible defaults that
 * every page inherits unless it overrides them with `createMetadata`.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  icons: { icon: "/favicon.ico" },
}

interface CreateMetadataOptions {
  /** Page title; the layout template appends `· {site name}`. Omit for home. */
  title?: string
  description?: string
  /** Canonical path, e.g. `/about`. Resolved against metadataBase. */
  path?: string
  type?: "website" | "article"
  noIndex?: boolean
}

/**
 * Build a complete, consistent per-page `Metadata` object — canonical, Open
 * Graph, and Twitter are all derived from the same title/description/path so
 * pages stay a single declarative line. OG/Twitter images come from the
 * `opengraph-image` file conventions and are merged in by Next automatically.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  type = "website",
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const ogTitle = title ?? siteConfig.title

  return {
    // Omit when absent so Next inherits the layout's `title.default` instead of
    // an explicit `undefined`, which suppresses the <title> entirely.
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: ogTitle,
      description,
      siteName,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}
