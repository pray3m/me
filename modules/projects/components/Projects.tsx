"use client"

import EmptyState from "@/common/components/elements/EmptyState"
import ProductCardSkeleton from "@/common/components/skeleton/ProductCardSkeleton"
import { PROJECTS } from "@/data/projects"
import { motion } from "framer-motion"
import { type FC, useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"

const Projects: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const filteredProjects = PROJECTS.filter((p) => p?.is_visible)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading && filteredProjects.length === 0) {
    return <EmptyState message="No Data" />
  }

  return (
    <div className="grid gap-5 pt-2 sm:grid-cols-2">
      {!isLoading
        ? filteredProjects?.map((project, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))
        : [1, 2].map((_, index) => <ProductCardSkeleton key={index} />)}
    </div>
  )
}

export default Projects
