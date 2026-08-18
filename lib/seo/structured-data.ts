import { STACKS } from "@/common/constant/stacks"
import { siteAlternateNames, siteConfig, siteName } from "./config"

const KNOWS_ABOUT_DOMAINS = [
  "Full-stack web development",
  "SaaS products",
  "Browser extensions",
  "LinkedIn automation",
  "AI-assisted products",
]

const PERSON_ID = `${siteConfig.url}/#person`
const WEBSITE_ID = `${siteConfig.url}/#website`
const PROFILE_ID = `${siteConfig.url}/#profilepage`

function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    alternateName: ["pray3m", "@pray3m", "@pray3m_", "Prem"],
    description: siteConfig.description,
    url: siteConfig.url,
    jobTitle: siteConfig.jobTitle,
    hasOccupation: { "@type": "Occupation", name: siteConfig.jobTitle },
    worksFor: {
      "@type": "Organization",
      name: siteConfig.employer.name,
      url: siteConfig.employer.url,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.country,
    },
    knowsAbout: [...KNOWS_ABOUT_DOMAINS, ...STACKS.map((stack) => stack.name)],
    image: `${siteConfig.url}/images/prem.jpg`,
    sameAs: Object.values(siteConfig.socials),
  }
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteName,
    alternateName: siteAlternateNames,
    description: siteConfig.description,
    publisher: { "@id": PERSON_ID },
  }
}

// The site is one person's portfolio, so the profile *is* the site: mark it a
// ProfilePage whose subject is the Person. Google reads mainEntity to attribute
// the page to that person.
function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": PROFILE_ID,
    url: siteConfig.url,
    name: siteName,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  }
}

/** Homepage identity graph — render only on the domain root page. */
export function rootGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(), websiteSchema(), profilePageSchema()],
  }
}

/** BreadcrumbList for a page, e.g. Home › Projects › ZyFlow. */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}
