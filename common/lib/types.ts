import type { ReactNode } from "react"

export interface MenuItemProps {
  name: string
  href: string
  icon: ReactNode
  visible: boolean
}

export interface BlogItemProps {
  title: string
  category: string
  image: string
  views: number
  date: string
  content: string
  slug: string
}

export interface BlogProps {
  blogs: BlogItemProps[]
}

export interface CareerProps {
  position: string
  company: string
  logo: string | null
  location: string
  location_type: string
  type: string
  start_date: string
  end_date: string | null
  industry: string
  link: string | null
}

// projects.ts
export interface ProjectItemProps {
  title: string
  slug: string
  description: string
  image: string
  links: {
    demo?: string
    github?: string
  }
  stacks: string[]
}
export interface ProjectsProps {
  projects: ProjectItemProps[]
}

// services/types.ts

export interface BestDay {
  date: string
  text: string
}

export interface Language {
  name: string
  total_seconds: number
}

export interface Editor {
  name: string
  total_seconds: number
}

export interface ReadStats {
  last_update: string
  start_date: string
  end_date: string
  range: string
  categories: string[]
  best_day: BestDay
  human_readable_daily_average: string
  human_readable_total: string
  languages: Language[]
  editors: Editor[]
}

export interface AllTimeStats {
  text: string
  total_seconds: number
}

export interface WakatimeResponse {
  status: number
  data: ReadStats | AllTimeStats | {}
}
