import { SiWakatime as WakatimeIcon } from "react-icons/si"
import IconTile from "@/components/ds/icon-tile"
import { getReadStatsData } from "@/modules/dashboard/data/coding-stats"
import Progress from "./Progress"

/**
 * The homepage cut of `CodingActive`: total, daily average, and the top
 * languages — the dashboard keeps the date range, best day and all-time total.
 */
const CodingActiveSummary = async () => {
  const stats = await getReadStatsData()

  const headline = stats
    ? `${stats.human_readable_total} in the last 30 days · ${stats.human_readable_daily_average} a day`
    : "Couldn't reach WakaTime right now."
  const languages = stats?.languages ?? []

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center">
        <IconTile className="mx-4">
          <WakatimeIcon />
        </IconTile>

        <div className="flex min-w-0 flex-1 items-center gap-3 border-border border-l border-dashed py-3.5 pr-4 pl-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground leading-snug">
              Coding time
            </h3>
            <p className="mt-0.5 text-muted-foreground text-sm">{headline}</p>
          </div>

          <a
            href="https://wakatime.com/@pray3m"
            target="_blank"
            rel="noopener"
            className="shrink-0 font-mono text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:underline"
          >
            @pray3m
          </a>
        </div>
      </div>

      {languages.length > 0 && (
        <ul className="space-y-2 border-border border-t border-dashed p-4 text-body">
          {languages.map((language) => (
            <li key={language.name}>
              <Progress
                data={language}
                className="bg-linear-to-r from-amber-400 to-rose-600"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CodingActiveSummary
