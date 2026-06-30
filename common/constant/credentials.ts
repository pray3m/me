export type Credential = {
  title: string
  issuer: string
  year: string
  description: string
  link: string
}

export const CREDENTIALS: Credential[] = [
  {
    title: "Full Stack Open",
    issuer: "University of Helsinki",
    year: "2025",
    description:
      "University of Helsinki's deep-dive into modern web development — React, Node.js, GraphQL, TypeScript, testing, and CI/CD.",
    link: "https://github.com/pray3m/FullStackOpen2025",
  },
  {
    title: "Advanced React",
    issuer: "Meta",
    year: "2025",
    description:
      "Meta's advanced React course — hooks in depth, performance, reusable component patterns, and testing.",
    link: "https://www.linkedin.com/in/pray3m/",
  },
  {
    title: "Postman API Fundamentals",
    issuer: "Postman",
    year: "2024",
    description:
      "Student Expert certification covering API design, testing, and debugging with Postman.",
    link: "https://www.linkedin.com/in/pray3m/",
  },
  {
    title: "ETHGlobal Superhack 2024",
    issuer: "ETHGlobal",
    year: "2024",
    description:
      "Participated in ETHGlobal Superhack, building Nepathya DeFi — an AI-assisted cross-chain DeFi experiment with account abstraction.",
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
