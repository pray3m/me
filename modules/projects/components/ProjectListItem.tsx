import { ArrowRight, ChevronDown, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import type { FC } from "react"
import IconTile from "@/components/ds/icon-tile"
import Tag from "@/components/ds/tag"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ds/tooltip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type Props = Project & {
  defaultOpen?: boolean
}

const ProjectListItem: FC<Props> = ({
  title,
  slug,
  description,
  period,
  role,
  stacks,
  highlights,
  link_demo,
  link_github,
  defaultOpen = false,
}) => {
  const externalLink = link_demo || link_github
  const meta = [period, role].filter(Boolean).join(" · ")

  return (
    <li className="border-border border-b last:border-b-0">
      <Collapsible defaultOpen={defaultOpen} className="group/project">
        <div className="relative flex items-center transition-colors hover:bg-accent/60">
          <IconTile className="mx-4">{title.charAt(0).toUpperCase()}</IconTile>

          <div className="flex min-w-0 flex-1 items-center gap-3 border-border border-l border-dashed py-3.5 pr-4 pl-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-foreground leading-snug">
                <CollapsibleTrigger className="text-left outline-none focus-visible:underline">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {title}
                </CollapsibleTrigger>
              </h3>
              {meta && (
                <p className="mt-0.5 truncate text-muted-foreground text-sm">
                  {meta}
                </p>
              )}
            </div>

            {externalLink && (
              <Tooltip>
                <TooltipTrigger
                  delay={50}
                  render={
                    <a
                      href={externalLink}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Open ${title}`}
                      className="relative flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors after:absolute after:-inset-2 hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand"
                    />
                  }
                >
                  <LinkIcon size={15} />
                </TooltipTrigger>
                <TooltipContent>Open project</TooltipContent>
              </Tooltip>
            )}
            <ChevronDown
              aria-hidden="true"
              size={16}
              className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-open/project:rotate-180"
            />
          </div>
        </div>

        <CollapsibleContent
          hiddenUntilFound
          className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
        >
          <div className="space-y-4 border-border border-t border-dashed p-4 text-body">
            <p>{description}</p>

            {highlights && highlights.length > 0 && (
              <ul className="list-disc space-y-1 pl-5 marker:text-muted-foreground">
                {highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            <ul className="flex flex-wrap gap-1.5">
              {stacks.map((stack) => (
                <li key={stack} className="flex">
                  <Tag>{stack}</Tag>
                </li>
              ))}
            </ul>

            <Link
              href={`/projects/${slug}`}
              className="group/link inline-flex items-center gap-1 font-medium text-brand text-sm outline-none transition-colors hover:text-brand-hover focus-visible:underline"
            >
              Read case study
              <ArrowRight
                size={14}
                className="transition-transform group-hover/link:translate-x-0.5"
              />
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </li>
  )
}

export default ProjectListItem
