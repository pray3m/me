// NOTE: Rewritten from the original template's placeholder (Jakarta) data.
// Hyteno is confirmed via LinkedIn/GitHub. The Open Source entry is backed by
// real shipped work (aaza on Homebrew, ZyFlow SaaS, freelanceX 18★). Entries
// marked `TODO: confirm` need real titles/dates/links from Prem's LinkedIn PDF.
// `logo: null` falls back to a generic building icon (no asset needed yet).

export const CAREERS = [
  {
    // Confirmed: LinkedIn "Prem Gautam - Hyteno" + repo `hyteno-fullstack-todo`
    // (Nov 2024 "Hyteno Mern Developer Task | React, Nestjs, PostgreSQL").
    position: "Full-Stack Developer", // TODO: confirm exact title (RocketReach hints "IT lead")
    company: "Hyteno",
    logo: null,
    location: "Nepal", // TODO: confirm
    location_type: "Remote", // TODO: confirm (Remote / Hybrid / Onsite)
    type: "Fulltime",
    start_date: "2024-11", // TODO: confirm start month
    end_date: null, // present
    industry: "software",
    link: "https://www.linkedin.com/company/hyteno", // TODO: confirm company URL
  },
  {
    // Legit, non-traditional entry. Backed by shipped public work:
    // aaza (macOS app distributed via Homebrew), ZyFlow (no-code scraping SaaS:
    // Stripe + Clerk + OpenAI), freelanceX (18★). Recruiters accept this.
    position: "Open Source & Indie Developer",
    company: "Self-employed",
    logo: null,
    location: "Nepal",
    location_type: "Remote",
    type: "Freelance",
    start_date: "2023-06", // TODO: confirm when your first public project shipped
    end_date: null,
    industry: "software",
    link: "https://github.com/pray3m",
  },
  {
    // Inferred from forked `bca-internship-report` (Apr 2025).
    position: "Software Engineer Intern", // TODO: confirm title
    company: "TODO: internship company", // TODO: confirm (may be Hyteno itself)
    logo: null,
    location: "Nepal", // TODO: confirm
    location_type: "Onsite", // TODO: confirm
    type: "Internship",
    start_date: "2025-01", // TODO: confirm
    end_date: "2025-04", // TODO: confirm
    industry: "software",
    link: "",
  },
]
