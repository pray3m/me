import type { IconType } from "react-icons"
import { BsRobot } from "react-icons/bs"
import { RiOpenaiFill } from "react-icons/ri"
import {
  SiApple,
  SiDocker,
  SiEthereum,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHomebrew,
  SiLeaflet,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactquery,
  SiShadcnui,
  SiSolidity,
  SiSqlite,
  SiStripe,
  SiSupabase,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiWxt,
} from "react-icons/si"

export type StackIcon = {
  icon: IconType
  className?: string
}

export const STACK_ICONS = {
  "Account Abstraction": { icon: SiEthereum, className: "text-indigo-400" },
  "Artificial Intelligence": { icon: BsRobot, className: "text-rose-500" },
  Docker: { icon: SiDocker, className: "text-sky-500" },
  Express: { icon: SiExpress },
  FastAPI: { icon: SiFastapi, className: "text-teal-500" },
  Firebase: { icon: SiFirebase, className: "text-yellow-500" },
  Git: { icon: SiGit, className: "text-orange-600" },
  GitHub: { icon: SiGithub },
  GraphQL: { icon: SiGraphql, className: "text-pink-600" },
  Homebrew: { icon: SiHomebrew, className: "text-amber-600" },
  Leaflet: { icon: SiLeaflet, className: "text-green-600" },
  MongoDB: { icon: SiMongodb, className: "text-green-500" },
  NestJS: { icon: SiNestjs, className: "text-red-600" },
  "Next.js": { icon: SiNextdotjs },
  "Node.js": { icon: SiNodedotjs, className: "text-green-600" },
  OpenAI: { icon: RiOpenaiFill },
  PostgreSQL: { icon: SiPostgresql, className: "text-blue-500" },
  Prisma: { icon: SiPrisma, className: "text-emerald-500" },
  "Prisma ORM": { icon: SiPrisma, className: "text-emerald-500" },
  Python: { icon: SiPython, className: "text-blue-500" },
  "REST APIs": { icon: SiOpenapiinitiative, className: "text-lime-600" },
  React: { icon: SiReact, className: "text-sky-500" },
  "React Query": { icon: SiReactquery, className: "text-red-500" },
  SQLite: { icon: SiSqlite, className: "text-sky-600" },
  Solidity: { icon: SiSolidity },
  Stripe: { icon: SiStripe, className: "text-indigo-500" },
  Supabase: { icon: SiSupabase, className: "text-emerald-500" },
  Swift: { icon: SiSwift, className: "text-orange-500" },
  SwiftUI: { icon: SiApple },
  "Tailwind CSS": { icon: SiTailwindcss, className: "text-cyan-300" },
  TypeScript: { icon: SiTypescript, className: "text-blue-400" },
  Vercel: { icon: SiVercel },
  Vite: { icon: SiVite, className: "text-purple-500" },
  WXT: { icon: SiWxt, className: "text-violet-500" },
  "shadcn/ui": { icon: SiShadcnui },
} satisfies Record<string, StackIcon>

export type StackName = keyof typeof STACK_ICONS

const REGISTRY: Record<string, StackIcon | undefined> = STACK_ICONS

export const getStackIcon = (name: string): StackIcon | undefined =>
  REGISTRY[name]
