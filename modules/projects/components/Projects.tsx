"use client"

import { m } from "framer-motion"
import { type FC } from "react"
import EmptyState from "@/components/ds/empty-state"
import { PROJECTS } from "@/data/projects"
import ProjectCard from "./ProjectCard"

const Projects: FC = () => {
  const filteredProjects = PROJECTS.filter((p) => p?.is_visible)

  if (filteredProjects.length === 0) {
    return <EmptyState message="No Data" />
  }

  return (
    <div className="grid gap-5 pt-2 sm:grid-cols-2">
      {filteredProjects.map((project, index: number) => (
        <m.div
          key={project.slug}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProjectCard {...project} />
        </m.div>
      ))}
    </div>
  )
}

export default Projects
