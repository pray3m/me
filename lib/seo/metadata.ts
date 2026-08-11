import type { Metadata } from "next"
import { defaultSocialImage, siteConfig, siteName } from "./config"

const sharedOpenGraphImage = {
  url: defaultSocialImage.path,
  width: defaultSocialImage.width,
  height: defaultSocialImage.height,
  alt: defaultSocialImage.alt,
  type: defaultSocialImage.type,
}

const sharedTwitterImage = {
  url: defaultSocialImage.path,
  alt: defaultSocialImage.alt,
  width: defaultSocialImage.width,
  height: defaultSocialImage.height,
  type: defaultSocialImage.type,
}

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
    googleBot: {
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
    images: [sharedOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [sharedTwitterImage],
  },
  // Icons are wired up automatically from the file conventions in `app/`:
  // favicon.ico, icon.png (512), and apple-icon.png (180). Setting `icons`
  // here would override that convention and suppress the PNG links.
}

interface CreateMetadataOptions {
  /** Page title; the layout template appends `· {site name}`. Omit for home. */
  title?: string
  description?: string
  /** Canonical path, e.g. `/about`. Resolved against metadataBase. */
  path?: string
  type?: "website" | "article"
  noIndex?: boolean
  /** Use a colocated `opengraph-image` file instead of the shared card. */
  socialImage?: "shared" | "route"
}

/**
 * Build a complete, consistent per-page `Metadata` object — canonical, Open
 * Graph, and Twitter are all derived from the same title/description/path so
 * pages stay a single declarative line. The shared OG/Twitter image must be
 * repeated here because Next shallowly replaces nested metadata objects.
 * Routes with a colocated `opengraph-image` opt out through `socialImage`.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  type = "website",
  noIndex = false,
  socialImage = "shared",
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
      ...(socialImage === "shared" ? { images: [sharedOpenGraphImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      ...(socialImage === "shared" ? { images: [sharedTwitterImage] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}
