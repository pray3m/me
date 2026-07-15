import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SectionHeading } from "@/components/ds"
import { PROJECTS } from "@/data/projects"
import ProjectCard from "@/modules/projects/components/ProjectCard"

const featuredProjectSlugs = ["pikeah", "maison-architecture", "cro-scan"]

const FeaturedProjects = () => {
  const featuredProjects = featuredProjectSlugs
    .map((slug) => PROJECTS.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project))

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <SectionHeading title="Featured work" />
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1 font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>
            View all <span className="hidden sm:inline">projects</span>
          </span>
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.slug} {...project} priority={index === 0} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProjects
