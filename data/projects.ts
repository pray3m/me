export const PROJECTS: Project[] = [
  {
    title: "Pikeah",
    slug: "pikeah",
    description:
      "A multi-tenant LinkedIn outreach platform with a dashboard, API, browser extension, unified inbox, team permissions, and campaign automation.",
    image: "/images/projects/pikeah.svg",
    link_demo: "https://pikeah.com",
    link_github: "",
    stacks: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "Docker",
      "WXT",
    ],
    role: "Lead engineer and product owner",
    problem:
      "Teams needed a productized way to run LinkedIn outreach without losing track of accounts, conversations, permissions, and campaign state across members.",
    built:
      "I led the product and engineering work across the Next.js dashboard, NestJS API, WXT browser extension, organization/team model, unified inbox, campaign engine, deployment, and release process.",
    constraints:
      "The product has to stay reliable around browser automation limits, LinkedIn session behavior, team data boundaries, and production releases while remaining understandable to early users.",
    outcome:
      "MVP shipped and is now moving through versioned 0.7.x releases with internal team rollout, account safety improvements, inbox-to-lead linking, and member access controls.",
    metrics: [
      "Built from scratch as Hyteno's flagship in-house SaaS",
      "Extension releases shipped through the 0.7.x line",
      "Includes dashboard, API, extension, shared packages, and Docker deployment",
    ],
    highlights: [
      "Multi-tenant orgs and role-based permissions",
      "Unified inbox linked back to campaign leads",
      "Browser extension with paced automation and account-safety controls",
      "Staff impersonation model designed without a master password",
    ],
    is_visible: true,
  },
  {
    title: "Maison & Architecture",
    slug: "maison-architecture",
    description:
      "A multi-app platform for France's architecture and construction market, spanning the public site, admin portal, partner portal, and shared frontend kit.",
    image: "/images/projects/maison.svg",
    link_demo: "https://maison-architecture.com",
    link_github: "",
    stacks: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    role: "Primary frontend engineer",
    problem:
      "A large architecture platform needed consistent public, admin, and partner experiences while supporting thousands of companies and architects.",
    built:
      "I own the client-facing frontend, built and maintain admin and partner portals, contribute to the shared component kit, and support backend/frontend integration across the platform.",
    constraints:
      "The work spans several apps with different users, SEO needs, dashboard workflows, production migration concerns, and live operational checks after launch.",
    outcome:
      "The new production site went live with staging/production environments, search indexing, analytics, and post-deploy checks across hosting, database, and asset storage.",
    metrics: [
      "Serves roughly 8,000 companies and 2,200+ architects",
      "Owns the client-facing frontend end to end",
      "Public, admin, partner, shared-kit, and backend surfaces",
    ],
    highlights: [
      "Production launch and domain migration support",
      "Google Search Console and sitemap indexing setup",
      "Shared component work across multiple dashboards",
    ],
    is_visible: true,
  },
  {
    title: "Cro-scan",
    slug: "cro-scan",
    description:
      "An AI website-conversion auditor that analyzes a site and turns broad conversion advice into concrete, prioritized improvements.",
    image: "/images/projects/cro-scan.svg",
    link_demo: "https://cro-scan.com",
    link_github: "",
    stacks: ["Next.js", "TypeScript", "OpenAI", "Node.js"],
    role: "Lead developer",
    problem:
      "Founders and site owners often know their landing page underperforms, but they need specific fixes instead of generic CRO checklists.",
    built:
      "I led the MVP build from product idea to launch, wiring the site analysis flow, AI-generated audit output, and the product surface around actionable recommendations.",
    constraints:
      "The product needed to feel fast, give useful feedback from limited public website context, and support a launch cycle without overbuilding the first version.",
    outcome:
      "Shipped MVP, supported the Product Hunt launch, and helped land the first beta testers through targeted outreach.",
    metrics: [
      "MVP shipped to a public domain",
      "Product Hunt launch support",
      "Initial beta-tester acquisition through custom outreach",
    ],
    highlights: [
      "AI-assisted website audit flow",
      "Action-first conversion recommendations",
      "Lean launch scope for fast validation",
    ],
    is_visible: true,
  },
  {
    title: "Netra Guardian",
    slug: "netra-guardian",
    description:
      "An edge-AI highway safety and vehicle-investigation system built for the Lumbini Province Police Hackathon 2026.",
    image: "/images/projects/netra-guardian.svg",
    link_demo: "",
    link_github: "",
    stacks: ["Python", "FastAPI", "React", "Leaflet", "YOLO", "SQLite"],
    role: "Hackathon builder, system designer",
    problem:
      "Highway CCTV is often passive: useful after an incident, but slow to help patrol teams detect danger, dispatch nearby units, or investigate vehicle movement.",
    built:
      "Built a dashboard, detection pipeline, alert flow, risk heatmap, vehicle search, patrol dispatch, watchlist, audit trail, and demo-safe scripts around real and simulated traffic inputs.",
    constraints:
      "The system had to work in a 36-hour sprint, handle unreliable connectivity, avoid claiming fully automated enforcement, and stay useful as an investigation aid.",
    outcome:
      "Team Infinity was selected among the top 20 teams to compete and shipped a complete operational demo loop for safety detection and vehicle investigation.",
    metrics: [
      "Top-20 selected team at Lumbini Province Police Hackathon 2026",
      "Backed by a comprehensive backend test suite",
      "5 dashboard tabs covering monitor, vehicle track, cameras, watchlist, and demo lab",
    ],
    highlights: [
      "Crash, overspeed, wrong-way, and erratic-driving event flow",
      "Telegram patrol notification path",
      "Plate detection/OCR pipeline with fuzzy matching",
      "Camera-anchored events and nearest-patrol dispatch",
    ],
    is_visible: true,
  },
  {
    title: "ZyFlow",
    slug: "zyflow",
    description:
      "A no-code web-scraping SaaS with a drag-and-drop workflow builder, scheduling, credit-based billing, and AI-assisted field detection.",
    image: "/images/projects/zyflow.svg",
    link_demo: "https://zyflow.vercel.app",
    link_github: "https://github.com/pray3m/ZyFlow",
    stacks: ["Next.js", "TypeScript", "Prisma ORM", "Stripe", "OpenAI"],
    role: "Full-stack builder, final-year project",
    problem:
      "Non-technical users need repeatable web data extraction, but most scraping tools either require code or hide too much of the workflow.",
    built:
      "Designed the SaaS flow around visual scraping steps, scheduled runs, credit usage, Stripe billing, and AI-assisted field detection.",
    constraints:
      "The project had to balance a college capstone scope with a real product shape: auth, billing, workflows, scraping behavior, and a usable dashboard.",
    outcome:
      "Delivered a full-stack final-year BCA project that demonstrates SaaS architecture, billing, and AI-assisted product thinking.",
    metrics: [
      "Final-year BCA capstone",
      "Includes workflow builder, scheduling, credits, and billing",
      "Public demo and source repository available",
    ],
    highlights: [
      "Drag-and-drop scraping workflow model",
      "Stripe-backed credit flow",
      "AI-assisted field detection",
    ],
    is_visible: true,
  },
  {
    title: "aaza",
    slug: "aaza",
    description:
      "A native macOS menu-bar app that shows the Nepali Bikram Sambat date and installs with a single Homebrew command.",
    image: "/images/projects/aaza.svg",
    link_demo: "https://github.com/pray3m/aaza/releases",
    link_github: "https://github.com/pray3m/aaza",
    stacks: ["Swift", "SwiftUI", "Homebrew"],
    role: "Solo macOS app developer",
    problem:
      "Nepali users on macOS often need the Bikram Sambat date visible without opening a calendar or converting dates manually.",
    built:
      "Built a lightweight SwiftUI menu-bar app, packaged releases, and maintained a Homebrew cask for one-command installation.",
    constraints:
      "The app needed to stay native, small, unobtrusive, and easy to distribute outside the Mac App Store.",
    outcome:
      "Published a practical macOS utility with release builds and Homebrew distribution.",
    metrics: [
      "Native SwiftUI menu-bar app",
      "Distributed through Homebrew",
      "Public release builds available",
    ],
    highlights: [
      "Bikram Sambat date in the menu bar",
      "One-command install path",
      "Small utility built for Nepali daily use",
    ],
    is_visible: true,
  },
  {
    title: "premgautam.me",
    slug: "portfolio",
    description:
      "This site: a personal portfolio with projects, career history, live dashboard data, SEO metadata, and an AI command palette.",
    image: "/images/projects/portfolio.svg",
    link_demo: "https://premgautam.me",
    link_github: "https://github.com/pray3m/me",
    stacks: ["Next.js", "TypeScript", "Tailwind CSS", "React Query", "OpenAI"],
    role: "Designer and full-stack maintainer",
    problem:
      "A portfolio should be more than a static resume; it needs to show the work, the engineering taste, and the systems behind the person.",
    built:
      "Built a Next.js App Router site with static project content, SEO helpers, a command palette, WakaTime/GitHub/Spotify integrations, and a tokenized design system.",
    constraints:
      "The site has to stay fast, maintainable, public-safe, and easy to update as the private career knowledge base evolves.",
    outcome:
      "The site now acts as a polished public projection of my work, with stronger project proof and a clearer full-cycle engineering position.",
    metrics: [
      "Next.js 16 App Router",
      "Static project pages generated from typed data",
      "Live dashboard integrations for coding and contribution stats",
    ],
    highlights: [
      "Typed SEO metadata and structured data",
      "Command palette with AI assistant",
      "Design-system documentation and tokenized UI",
    ],
    is_visible: true,
  },
  {
    title: "freelanceX",
    slug: "freelanceX",
    description:
      "A freelance marketplace where sellers list gigs and buyers order services, with real-time chat, Stripe payments, ratings, and reviews.",
    image: "/images/projects/freelancex.png",
    link_demo: "https://freelancex.vercel.app",
    link_github: "https://github.com/pray3m/freelanceX",
    stacks: ["Next.js", "Node.js", "Prisma ORM", "MongoDB", "Stripe"],
    role: "Full-stack builder",
    problem:
      "Marketplace flows are hard to understand until you build the full loop: listings, orders, messaging, payments, and trust signals.",
    built:
      "Implemented a Fiverr-style marketplace experience with gig listings, ordering, payments, live chat, ratings, and reviews.",
    constraints:
      "The app needed to cover both buyer and seller workflows while keeping the architecture understandable as a learning project.",
    outcome:
      "Shipped a complete marketplace project that reached 18 stars on GitHub.",
    metrics: ["18 stars on GitHub", "Buyer, seller, chat, and payment flows"],
    highlights: [
      "Stripe payment flow",
      "Real-time chat",
      "Ratings and reviews",
    ],
    is_visible: true,
  },
  {
    title: "Nepathya DeFi",
    slug: "nepathya-defi",
    description:
      "An ETHGlobal Superhack 2024 experiment exploring AI-assisted cross-chain DeFi with account abstraction and token bridging.",
    image: "/images/projects/nepathya-defi.svg",
    link_demo: "",
    link_github: "https://github.com/pray3m/AI-CrossFi-with-AA",
    stacks: ["Solidity", "Foundry", "Account Abstraction", "React"],
    role: "Hackathon builder",
    problem:
      "Cross-chain DeFi workflows can be fragmented and difficult for users to coordinate across wallets, networks, and actions.",
    built:
      "Built an experiment around account abstraction, cross-network token movement, and AI-assisted task flow during the hackathon.",
    constraints:
      "Hackathon time limits meant focusing on a working experiment and learning depth rather than a polished product.",
    outcome:
      "Completed a public hackathon project and source repository around DeFi, smart contracts, and account abstraction.",
    metrics: ["Built at ETHGlobal Superhack 2024", "Public source available"],
    highlights: [
      "Account abstraction experiment",
      "Cross-chain token flow",
      "AI-assisted DeFi concept",
    ],
    is_visible: true,
  },
]
