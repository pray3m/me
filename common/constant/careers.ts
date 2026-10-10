import type { CareerProps, ExperienceProps } from "@/common/lib/types"

// Real career timeline, confirmed via LinkedIn + GitHub. Most recent first,
// grouped by employer so consecutive roles at one company read as one tenure.
// `logo: null` falls back to the company monogram (no asset needed yet).
//
// Highlights are the public-safe cut of the CV bullets — keep them outcome-first
// and free of anything internal to a client or product.

export const EXPERIENCES: ExperienceProps[] = [
  {
    company: "Hyteno",
    logo: null,
    link: "https://www.hyteno.com",
    is_current: true,
    positions: [
      {
        position: "Full-Stack Engineer",
        location: "Butwal, Nepal",
        location_type: "Remote",
        type: "Full-time",
        start_date: "2026-01",
        end_date: null, // present
        industry: "software",
        highlights: [
          "Lead engineer on Pikeah, a multi-tenant LinkedIn-outreach SaaS — a Turborepo monorepo spanning a Next.js dashboard, API, browser extension, and shared packages.",
          "Ran the infrastructure migration of two production platforms off AWS onto a self-managed VPS: Docker containers, Dokploy deploys, monitoring, and automated backups.",
          "Co-built Zap, a Pipedrive Marketplace app automating proposal generation, client acceptance, and Stripe payments.",
          "Wired n8n automations to Vapi voice-AI agents for inbound calls, lead processing, and internal ops.",
        ],
        stacks: [
          "TypeScript",
          "Next.js",
          "NestJS",
          "PostgreSQL",
          "Prisma",
          "Docker",
          "n8n",
        ],
      },
      {
        position: "Junior Full-Stack Developer",
        location: "Butwal, Nepal",
        location_type: "Remote",
        type: "Full-time",
        start_date: "2025-02",
        end_date: "2025-12",
        industry: "software",
        highlights: [
          "Lead developer on Cro-scan, an AI website-conversion auditor — shipped the MVP and ran its Product Hunt launch.",
          "Built an AI project-estimation tool on the OpenAI Realtime API, combining voice, chat, and tool-calling to quote prospects on the spot.",
          "Rebuilt the order flow and a real-time three-way messaging system connecting clients, partners, and admins.",
          "Led a UI/UX overhaul of Maison et Architecture, focused on responsive layout and render performance.",
        ],
        stacks: [
          "React",
          "Next.js",
          "Node.js",
          "MongoDB",
          "OpenAI API",
          "Tailwind CSS",
        ],
      },
      {
        position: "MERN Stack Developer Intern",
        location: "Butwal, Nepal",
        location_type: "Remote",
        type: "Internship",
        start_date: "2024-11",
        end_date: "2025-02",
        industry: "software",
        highlights: [
          "Improved onboarding flows on the Hyteno SaaS platform.",
          "Added click and view analytics across the Maison et Architecture catalogues.",
          "Fixed frontend bugs and tightened UI on both products.",
        ],
        stacks: ["React", "Node.js", "Express", "MongoDB"],
      },
    ],
  },
  {
    company: "NovaLoop Co.",
    logo: null,
    link: "",
    positions: [
      {
        position: "Full-Stack Developer",
        location: "Remote",
        location_type: "Remote",
        type: "Freelance",
        start_date: "2024-08",
        end_date: "2024-11",
        industry: "software",
        highlights: [
          "Owned PetGoMania, an e-commerce platform, end to end — admin dashboard, APIs, domain setup, and VPS deployment.",
          "Built a multilingual (English and Spanish) marketing site.",
        ],
        stacks: ["MongoDB", "Express", "React", "Node.js"],
      },
    ],
  },
]

/**
 * Flat, most-recent-first view of every role — what the `/about` career cards
 * render. Derived so `EXPERIENCES` stays the single source of truth.
 */
export const CAREERS: CareerProps[] = EXPERIENCES.flatMap(
  ({ company, logo, link, positions }) =>
    positions.map((position) => ({
      position: position.position,
      company,
      logo,
      location: position.location,
      location_type: position.location_type,
      type: position.type,
      start_date: position.start_date,
      end_date: position.end_date,
      industry: position.industry,
      link,
    }))
)
