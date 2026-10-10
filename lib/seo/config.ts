/**
 * Single source of truth for site-wide SEO. To reuse this module in another
 * project, edit the fields below. The `SITE_URL` env var overrides the URL.
 */
export const siteConfig = {
  name: "Prem Gautam",
  title: "Prem Gautam - Software Engineer",
  description:
    "I design and build web products across the full stack, from rough idea to production.",
  url: process.env.SITE_URL ?? "https://premgautam.com",
  locale: "en_US",
  jobTitle: "Full-Stack Engineer",
  twitterHandle: "@pray3m_",
  /** Public contact details — the footer, /contact and /llms.txt all read these. */
  email: "prem.gtm9@gmail.com",
  /** `wa.me/<username>` resolves to WhatsApp's username endpoint — no number. */
  whatsapp: { handle: "@prembtw", url: "https://wa.me/prembtw" },
  /** Kept on hand but deliberately not surfaced anywhere right now. */
  telegram: { handle: "@onlyprems", url: "https://t.me/onlyprems" },
  /** This site's own repository, linked from the footer colophon. */
  repository: "https://github.com/pray3m/me",
  /** Current employer — drives the Person `worksFor` structured data. */
  employer: { name: "Hyteno", url: "https://www.hyteno.com" },
  /** Home base — drives the Person `address` structured data. */
  location: { city: "Butwal", country: "NP" },
  /** Used for the Person `sameAs` structured data. */
  socials: {
    github: "https://github.com/pray3m",
    linkedin: "https://www.linkedin.com/in/pray3m/",
    twitter: "https://twitter.com/pray3m_",
    instagram: "https://instagram.com/pray3m",
  },
} as const

export const siteName = siteConfig.name

export const siteAlternateNames = [
  "pray3m",
  "premgautam.com",
  "premgautam.me",
] as const

/** Shared social card used when a route does not define a more specific one. */
export const defaultSocialImage = {
  path: "/opengraph-image",
  alt: "Prem Gautam · Full-Stack Engineer · AI-Driven Product Builder",
  width: 1200,
  height: 630,
  type: "image/png",
} as const
