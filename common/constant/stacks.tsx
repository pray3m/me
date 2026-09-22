import {
  STACK_ICONS,
  type StackIcon,
  type StackName,
} from "@/common/constant/stack-icons"

export const STACK_CATEGORIES = [
  "Frontend",
  "Backend",
  "DevOps",
  "Apps & Tools",
] as const

export type StackCategory = (typeof STACK_CATEGORIES)[number]

type StackEntry = {
  name: StackName
  category: StackCategory
}

export type Stack = StackEntry & StackIcon

const STACK_ENTRIES = [
  { name: "TypeScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "shadcn/ui", category: "Frontend" },
  { name: "Vite", category: "Frontend" },
  { name: "Python", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "Firebase", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  { name: "Git", category: "Apps & Tools" },
  { name: "GitHub", category: "Apps & Tools" },
  { name: "WXT", category: "Apps & Tools" },
  { name: "Artificial Intelligence", category: "Apps & Tools" },
] satisfies StackEntry[]

export const STACKS: Stack[] = STACK_ENTRIES.map((entry) => ({
  ...entry,
  ...STACK_ICONS[entry.name],
}))

export const STACK_GROUPS = STACK_CATEGORIES.map((category) => ({
  category,
  stacks: STACKS.filter((stack) => stack.category === category).sort((a, b) =>
    a.name.localeCompare(b.name)
  ),
})).filter((group) => group.stacks.length > 0)
