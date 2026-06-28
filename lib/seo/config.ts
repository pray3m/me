import site from "./site.json"

/**
 * Single source of truth for site-wide SEO. To reuse this module in another
 * project, edit the fields below — and `site.json` for the URL, which is shared
 * with `next-sitemap.config.js` (a CommonJS file that can't import this one).
 * `SITE_URL` env var overrides the URL in both places.
 */
export const siteConfig = {
  name: "Prem Gautam",
  title: "Prem Gautam - Full Stack Developer | Tech Enthusiast",
  description:
    "Personal website of Prem Gautam, a learner and full stack developer passionate about technology and innovation.",
  url: process.env.SITE_URL ?? site.url,
  locale: "en_US",
  jobTitle: "Full Stack Developer",
  twitterHandle: "@pray3m_",
  /** Used for the Person `sameAs` structured data. */
  socials: {
    github: "https://github.com/pray3m",
    linkedin: "https://www.linkedin.com/in/pray3m/",
    twitter: "https://twitter.com/pray3m_",
    instagram: "https://instagram.com/pray3m",
  },
} as const

/** `Site Name Portfolio` style label used for openGraph.siteName. */
export const siteName = `${siteConfig.name} Portfolio`
