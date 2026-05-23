export type Credential = {
  title: string
  issuer: string
  year: string
  description: string
  link: string
}

export const CREDENTIALS: Credential[] = [
  {
    title: "Full Stack Open 2025",
    issuer: "University of Helsinki",
    year: "2025",
    description:
      "Completed the University of Helsinki's deep-dive into modern web development with React, Node.js, GraphQL, and TypeScript.",
    link: "https://github.com/pray3m/FullStackOpen2025",
  },
  {
    title: "ETHGlobal Superhack 2024",
    issuer: "ETHGlobal",
    year: "2024",
    description:
      "Built Nepathya DeFi — AI-powered cross-chain DeFi with account abstraction — at a global Web3 hackathon.",
    link: "https://github.com/pray3m/AI-CrossFi-with-AA",
  },
  {
    title: "Published macOS App on Homebrew",
    issuer: "Open Source",
    year: "2026",
    description:
      "Shipped aaza, a native menu-bar app, and maintain its Homebrew tap for one-command installs.",
    link: "https://github.com/pray3m/aaza",
  },
]
