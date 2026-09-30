import {
  STACK_ICONS,
  type StackIcon,
  type StackName,
} from "@/common/constant/stack-icons"

export const STACK_CATEGORIES = [
  "Language",
  "Frontend",
  "Backend & Database",
  "Workflow & AI",
] as const

export type StackCategory = (typeof STACK_CATEGORIES)[number]

type StackEntry = {
  name: StackName
  category: StackCategory
}

export type Stack = StackEntry & StackIcon

// Order is deliberate (most-used first within each group) — not alphabetical.
const STACK_ENTRIES = [
  { name: "TypeScript", category: "Language" },
  { name: "JavaScript", category: "Language" },

  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "shadcn/ui", category: "Frontend" },
  { name: "Vite", category: "Frontend" },

  { name: "Node.js", category: "Backend & Database" },
  { name: "NestJS", category: "Backend & Database" },
  { name: "Express", category: "Backend & Database" },
  { name: "REST APIs", category: "Backend & Database" },
  { name: "GraphQL", category: "Backend & Database" },
  { name: "PostgreSQL", category: "Backend & Database" },
  { name: "Prisma", category: "Backend & Database" },
  { name: "MongoDB", category: "Backend & Database" },
  { name: "Supabase", category: "Backend & Database" },
  { name: "Firebase", category: "Backend & Database" },

  { name: "Claude", category: "Workflow & AI" },
  { name: "Cursor", category: "Workflow & AI" },
  { name: "Gemini", category: "Workflow & AI" },
  { name: "ChatGPT", category: "Workflow & AI" },
  { name: "Git", category: "Workflow & AI" },
  { name: "GitHub", category: "Workflow & AI" },
  { name: "Docker", category: "Workflow & AI" },
  { name: "Vercel", category: "Workflow & AI" },
  { name: "WXT", category: "Workflow & AI" },
] satisfies StackEntry[]

export const STACKS: Stack[] = STACK_ENTRIES.map((entry) => ({
  ...entry,
  ...STACK_ICONS[entry.name],
}))

export const STACK_GROUPS = STACK_CATEGORIES.map((category) => ({
  category,
  stacks: STACKS.filter((stack) => stack.category === category),
})).filter((group) => group.stacks.length > 0)
