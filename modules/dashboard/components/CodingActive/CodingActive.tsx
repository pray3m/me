import Link from "next/link"
import { SiWakatime as WakatimeIcon } from "react-icons/si"
import SectionHeading from "@/components/ds/section-heading"
import SectionSubHeading from "@/components/ds/section-sub-heading"
import { relativeTimeFromNow } from "@/lib/date"
import {
  getALLTimeSinceToday,
  getReadStats,
  type ReadStatsData,
} from "@/services/wakatime"
import CodingActiveList from "./CodingActiveList"
import Overview from "./Overview"

const formatLastUpdate = (raw?: string): string => {
  if (!raw) return ""
  const lastUpdate = new Date(raw)
  if (Number.isNaN(lastUpdate.getTime())) return ""
  lastUpdate.setMinutes(0, 0, 0) // startOf("hour")
  return relativeTimeFromNow(lastUpdate)
}

const getStats = async () => {
  try {
    const [readStats, allTime] = await Promise.all([
      getReadStats(),
      getALLTimeSinceToday(),
    ])
    if (readStats.status >= 400 || !("last_update" in readStats.data)) {
      return null
    }
    return {
      ...(readStats.data as ReadStatsData),
      all_time_since_today: allTime.data,
    }
  } catch {
    return null
  }
}

const CodingActive = async () => {
  const data = await getStats()

  return (
    <section className="flex flex-col gap-y-2">
      <SectionHeading
        title="Monthly Statistics"
        icon={<WakatimeIcon className="mr-1" />}
      />

      <SectionSubHeading>
        <div className="text-muted-foreground md:flex-row md:items-center">
          <span>My </span>
          <Link
            href="https://wakatime.com/@pray3m"
            className="hover:text-foreground hover:underline"
          >
            WakaTime
          </Link>
          <span> last 30 days stats.</span>
        </div>
        <div className="text-muted-foreground text-sm">
          Last update: <span>{formatLastUpdate(data?.last_update)}</span>
        </div>
      </SectionSubHeading>

      {data ? (
        <>
          <Overview data={data} />
          <CodingActiveList data={data} />
        </>
      ) : (
        <p className="text-muted-foreground text-sm">
          Couldn&apos;t load WakaTime stats right now.
        </p>
      )}
    </section>
  )
}

export default CodingActive
