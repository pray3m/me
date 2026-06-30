import type { FC } from "react"
import Image from "@/components/ds/image"
import ProjectLink from "./ProjectLink"

const ProjectDetail: FC<Project> = ({
  title,
  description,
  image,
  stacks,
  link_demo,
  link_github,
  role,
  problem,
  built,
  constraints,
  outcome,
  metrics,
  highlights,
}) => {
  const caseStudySections = [
    { title: "Problem", body: problem },
    { title: "What I Built", body: built },
    { title: "Constraints", body: constraints },
    { title: "Outcome", body: outcome },
  ].filter((section) => section.body)
  const hasProjectLinks = Boolean(link_demo || link_github)

  return (
    <article className="space-y-8">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Image
          src={image}
          width={1200}
          height={675}
          alt={`${title} project preview`}
          className="aspect-video w-full object-cover object-top"
          priority
          quality={75}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          {caseStudySections.map((section) => (
            <section
              key={section.title}
              className="space-y-2 border-border border-t pt-5"
            >
              <h2 className="font-medium text-lg">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-muted-foreground text-sm">Role</p>
            <p className="mt-1 font-medium">{role ?? "Full-stack builder"}</p>
          </div>

          {hasProjectLinks && (
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-muted-foreground text-sm">Links</p>
              <div className="mt-3">
                <ProjectLink link_demo={link_demo} link_github={link_github} />
              </div>
            </div>
          )}

          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-muted-foreground text-sm">Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stacks.map((stack) => (
                <span
                  key={stack}
                  className="rounded-full bg-background px-3 py-1 font-medium text-muted-foreground text-xs"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>

          {metrics && metrics.length > 0 && (
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-muted-foreground text-sm">Proof Points</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                {metrics.map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            </div>
          )}

          {highlights && highlights.length > 0 && (
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-muted-foreground text-sm">Highlights</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                {highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  )
}

export default ProjectDetail
