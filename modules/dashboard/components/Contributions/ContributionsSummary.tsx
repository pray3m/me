import { BsGithub as GithubIcon } from "react-icons/bs"
import IconTile from "@/components/ds/icon-tile"
import {
  countThisWeek,
  getContributionCalendar,
} from "@/modules/dashboard/data/contributions"
import Calendar from "./Calendar"

/**
 * The homepage cut of `Contributions`: the heatmap and a one-line headline,
 * without the four stat tiles the dashboard spells out.
 */
const ContributionsSummary = async () => {
  const calendar = await getContributionCalendar()

  const headline = calendar
    ? `${calendar.totalContributions.toLocaleString("en-US")} contributions in the last year · ${countThisWeek(calendar)} this week`
    : "Couldn't reach GitHub right now."

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center">
        <IconTile className="mx-4">
          <GithubIcon />
        </IconTile>

        <div className="flex min-w-0 flex-1 items-center gap-3 border-border border-l border-dashed py-3.5 pr-4 pl-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground leading-snug">GitHub</h3>
            <p className="mt-0.5 text-muted-foreground text-sm">{headline}</p>
          </div>

          <a
            href="https://github.com/pray3m"
            target="_blank"
            rel="noopener"
            className="shrink-0 font-mono text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:underline"
          >
            @pray3m
          </a>
        </div>
      </div>

      {calendar && (
        <div className="space-y-3 border-border border-t border-dashed p-4">
          <Calendar data={calendar} />
        </div>
      )}
    </div>
  )
}

export default ContributionsSummary
