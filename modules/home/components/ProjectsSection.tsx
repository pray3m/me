import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import SectionHeading from "@/components/ds/section-heading"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { PROJECTS } from "@/data/projects"
import ProjectListItem from "@/modules/projects/components/ProjectListItem"

const featuredProjectSlugs = ["pikeah", "maison-architecture", "cro-scan"]
const INITIAL_COUNT = 4

const ProjectsSection = () => {
  const visibleProjects = PROJECTS.filter((project) => project.is_visible)
  const featured = featuredProjectSlugs
    .map((slug) => visibleProjects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project))
  const projects = [
    ...featured,
    ...visibleProjects.filter((project) => !featured.includes(project)),
  ]
  const initial = projects.slice(0, INITIAL_COUNT)
  const rest = projects.slice(INITIAL_COUNT)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-1">
          <SectionHeading title="Projects" />
          <sup className="top-0 font-medium text-muted-foreground text-sm">
            ({projects.length})
          </sup>
        </div>
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

      <Collapsible className="group/more overflow-hidden rounded-xl border border-border">
        <ul>
          {initial.map((project, index) => (
            <ProjectListItem
              key={project.slug}
              {...project}
              defaultOpen={index === 0}
            />
          ))}
        </ul>

        {rest.length > 0 && (
          <>
            <CollapsibleContent
              hiddenUntilFound
              className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
            >
              <ul className="border-border border-t">
                {rest.map((project) => (
                  <ProjectListItem key={project.slug} {...project} />
                ))}
              </ul>
            </CollapsibleContent>

            <div className="flex justify-center border-border border-t py-3">
              <CollapsibleTrigger className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-secondary pr-2.5 pl-3 font-medium text-secondary-foreground text-sm shadow-[inset_0_0_1px] shadow-foreground/20 outline-none transition-colors hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-brand active:scale-[0.98]">
                <span className="group-data-open/more:hidden">Show more</span>
                <span className="hidden group-data-open/more:inline">
                  Show less
                </span>
                <ChevronDown
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 group-data-open/more:rotate-180"
                />
              </CollapsibleTrigger>
            </div>
          </>
        )}
      </Collapsible>
    </section>
  )
}

export default ProjectsSection
