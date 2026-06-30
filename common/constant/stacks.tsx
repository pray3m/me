import type { IconType } from "react-icons"
import { BsRobot } from "react-icons/bs"
import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGraphql,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWxt,
} from "react-icons/si"

export type Stack = {
  name: string
  icon: IconType
  className?: string
}

export const STACKS = [
  { name: "JavaScript", icon: SiJavascript, className: "text-yellow-400" },
  { name: "TypeScript", icon: SiTypescript, className: "text-blue-400" },
  { name: "Python", icon: SiPython, className: "text-blue-500" },
  { name: "React", icon: SiReact, className: "text-sky-500" },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss, className: "text-cyan-300" },
  { name: "shadcn/ui", icon: SiShadcnui },
  { name: "Vite", icon: SiVite, className: "text-purple-500" },
  { name: "Node.js", icon: SiNodedotjs, className: "text-green-600" },
  { name: "NestJS", icon: SiNestjs, className: "text-red-600" },
  { name: "Express", icon: SiExpress },
  { name: "REST APIs", icon: SiOpenapiinitiative, className: "text-lime-600" },
  { name: "GraphQL", icon: SiGraphql, className: "text-pink-600" },
  { name: "Prisma", icon: SiPrisma, className: "text-emerald-500" },
  { name: "PostgreSQL", icon: SiPostgresql, className: "text-blue-500" },
  { name: "MySQL", icon: SiMysql, className: "text-sky-600" },
  { name: "MongoDB", icon: SiMongodb, className: "text-green-500" },
  { name: "Supabase", icon: SiSupabase, className: "text-emerald-500" },
  { name: "Firebase", icon: SiFirebase, className: "text-yellow-500" },
  { name: "Docker", icon: SiDocker, className: "text-sky-500" },
  { name: "Nginx", icon: SiNginx, className: "text-green-500" },
  { name: "Git", icon: SiGit, className: "text-orange-600" },
  { name: "GitHub", icon: SiGithub },
  { name: "WXT", icon: SiWxt, className: "text-violet-500" },
  {
    name: "Artificial Intelligence",
    icon: BsRobot,
    className: "text-rose-500",
  },
] satisfies Stack[]
