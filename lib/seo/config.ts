/**
 * Single source of truth for site-wide SEO. To reuse this module in another
 * project, edit the fields below. The `SITE_URL` env var overrides the URL.
 */
export const siteConfig = {
  name: "Prem Gautam",
  title: "Prem Gautam · Full-Stack Engineer · AI-Driven Product Builder",
  description:
    "Personal site of Prem Gautam, also known online as pray3m — a full-stack engineer who builds and ships production SaaS end to end.",
  url: process.env.SITE_URL ?? "https://premgautam.me",
  locale: "en_US",
  jobTitle: "Full-Stack Engineer",
  twitterHandle: "@pray3m_",
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

/** `Site Name Portfolio` style label used for openGraph.siteName. */
export const siteName = `${siteConfig.name} Portfolio`
