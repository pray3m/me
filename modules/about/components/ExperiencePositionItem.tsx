import { Briefcase, ChevronDown, GraduationCap } from "lucide-react"
import type { FC } from "react"
import type { ExperiencePositionProps } from "@/common/lib/types"
import IconTile from "@/components/ds/icon-tile"
import Tag from "@/components/ds/tag"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { formatExactDuration, formatMonthYear } from "@/lib/date"

type Props = ExperiencePositionProps & {
  defaultOpen?: boolean
}

const ExperiencePositionItem: FC<Props> = ({
  position,
  type,
  start_date,
  end_date,
  highlights,
  stacks,
  defaultOpen = false,
}) => {
  const RoleIcon = type === "Internship" ? GraduationCap : Briefcase
  const period = `${formatMonthYear(start_date)} — ${
    end_date ? formatMonthYear(end_date) : "Present"
  }`
  const duration = formatExactDuration(start_date, end_date)

  return (
    <li className="relative pb-5 before:absolute before:-top-5 before:bottom-0 before:left-3.5 before:w-px before:bg-border last:pb-0 last:before:hidden">
      <Collapsible defaultOpen={defaultOpen} className="group/role">
        <CollapsibleTrigger className="relative block w-full select-none text-left outline-none before:absolute before:-top-1.5 before:-right-2 before:-bottom-1.5 before:left-7 before:rounded-lg before:transition-colors hover:before:bg-accent/60 focus-visible:before:ring-2 focus-visible:before:ring-brand">
          <div className="relative z-1 flex items-center gap-3">
            <IconTile>
              <RoleIcon aria-hidden="true" />
            </IconTile>

            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-foreground leading-snug">
                {position}
              </h4>
              <p className="mt-0.5 text-muted-foreground text-sm tabular-nums">
                {period}
                {duration && ` · ${duration}`}
                {/* The tile icon already tells an internship from a job, so
                    the type can go when the line would otherwise wrap. */}
                <span className="hidden sm:inline">{` · ${type}`}</span>
              </p>
            </div>

            <ChevronDown
              aria-hidden="true"
              size={16}
              className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-open/role:rotate-180"
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent
          hiddenUntilFound
          className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
        >
          <div className="space-y-3 pt-3 pl-10 text-body">
            <ul className="list-disc space-y-1.5 pl-4 marker:text-muted-foreground">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-1.5">
              {stacks.map((stack) => (
                <li key={stack} className="flex">
                  <Tag>{stack}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </li>
  )
}

export default ExperiencePositionItem
