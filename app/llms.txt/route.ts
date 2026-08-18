import { PROJECTS } from "@/data/projects"
import { siteConfig } from "@/lib/seo"

/**
 * /llms.txt — a spec-shaped (llmstxt.org) plain-text profile for AI agents.
 */

export const dynamic = "force-static"

/** Bump when the hand-written facts below change (not on every deploy). */
const LAST_UPDATED = "2026-08-18"

const EMAIL = "prem.gtm9@gmail.com"
const TELEGRAM = "https://t.me/onlyprems"

const url = (path = "") => `${siteConfig.url}${path}`

function buildLlmsTxt(): string {
  const projects = PROJECTS.filter((p) => p.is_visible)
  const featured = ["pikeah", "maison-architecture", "cro-scan"]
  const featuredProjects = featured
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p))
  const otherProjects = projects.filter((p) => !featured.includes(p.slug))

  const projectLine = (p: Project) => {
    const extras = [
      p.link_demo ? `live: ${p.link_demo}` : null,
      p.link_github ? `source: ${p.link_github}` : null,
    ].filter(Boolean)
    const suffix = extras.length ? ` (${extras.join(", ")})` : ""
    return `- [${p.title}](${url(`/projects/${p.slug}`)}): ${p.description}${suffix}`
  }

  return `# ${siteConfig.name}

> ${siteConfig.name} (online alias: pray3m) is a ${siteConfig.jobTitle} at ${siteConfig.employer.name}, based in ${siteConfig.location.city}, Nepal, working remotely. He builds SaaS products end to end — React/Next.js frontends, Node.js/NestJS + PostgreSQL backends, and the Docker/server infrastructure behind them — with AI where it genuinely helps.

Facts, current as of ${LAST_UPDATED}:

- Name: ${siteConfig.name}; aliases: pray3m, @pray3m, @pray3m_
- Role: ${siteConfig.jobTitle} at ${siteConfig.employer.name} (${siteConfig.employer.url}), since 2024 (intern → junior → full-stack engineer)
- Location: ${siteConfig.location.city}, Nepal · timezone Asia/Kathmandu (UTC+05:45) · works remotely
- Availability: open to freelance projects and full-time roles; usually replies within 24 hours
- Contact: ${EMAIL} · Telegram ${TELEGRAM}
- Website: ${url()}
- GitHub: ${siteConfig.socials.github}
- LinkedIn: ${siteConfig.socials.linkedin}
- X/Twitter: ${siteConfig.socials.twitter}
- Education: Bachelor in Computer Applications (BCA), Nepathya College (Tribhuvan University), 2021–2025
- Core stack: TypeScript, React, Next.js, Node.js, NestJS, PostgreSQL, Prisma, Docker, Tailwind CSS
- Also works with: Python, Supabase, MongoDB, Stripe, OpenAI APIs, WXT (browser extensions), Swift/SwiftUI
- Domains: SaaS products, multi-tenant systems, browser extensions, LinkedIn outreach automation, AI-assisted products

## Pages

- [Home](${url()}): Introduction, featured work, stack, and how to work together.
- [About](${url("/about")}): Story, career timeline (Hyteno, freelance), and credentials.
- [Projects](${url("/projects")}): Every project with a short case study — problem, what was built, constraints, outcome.
- [Contact](${url("/contact")}): Email and Telegram; open to freelance and full-time roles.

## Featured projects

${featuredProjects.map(projectLine).join("\n")}

## Other projects

${otherProjects.map(projectLine).join("\n")}

## Optional

- [Dashboard](${url("/dashboard")}): Live GitHub contribution and WakaTime coding-activity stats, refreshed hourly.
- [Sitemap](${url("/sitemap.xml")}): All indexable URLs.
`
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Advertise itself the way docs hosts do; also keep it out of the
      // web index — it is a machine profile, not a page.
      Link: '</llms.txt>; rel="llms-txt"',
      "X-Robots-Tag": "noindex",
    },
  })
}
