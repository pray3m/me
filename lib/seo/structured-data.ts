import { siteConfig, siteName } from "./config"

const PERSON_ID = `${siteConfig.url}/#person`
const WEBSITE_ID = `${siteConfig.url}/#website`

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
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
    ],
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
    description: siteConfig.description,
    publisher: { "@id": PERSON_ID },
  }
}

/** Site-wide Person + WebSite graph — render once in the root layout. */
export function rootGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(), websiteSchema()],
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
