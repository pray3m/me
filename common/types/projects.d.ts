interface Project {
  title: string
  slug: string
  description: string
  image: string
  link_demo?: string
  link_github?: string
  stacks: string[]
  role?: string
  problem?: string
  built?: string
  constraints?: string
  outcome?: string
  metrics?: string[]
  highlights?: string[]
  is_visible?: boolean
  updated_at?: Date
}
