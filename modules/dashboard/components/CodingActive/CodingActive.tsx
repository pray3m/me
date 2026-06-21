"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import type { FC } from "react"
import { SiWakatime as WakatimeIcon } from "react-icons/si"
import SectionHeading from "@/components/ds/section-heading"
import SectionSubHeading from "@/components/ds/section-sub-heading"
import Skeleton from "@/components/ds/skeleton"
import { relativeTimeFromNow } from "@/lib/date"
import { fetcher } from "@/services/fetcher"
import CodingActiveList from "./CodingActiveList"
import Overview from "./Overview"

const CodingActive: FC = () => {
  const { data, error } = useQuery({
    queryKey: ["wakatime"],
    queryFn: () => fetcher("/api/wakatime"),
  })

  const formatLastUpdate = (): string => {
    if (!data?.last_update) return ""
    const lastUpdate = new Date(data.last_update)
    if (Number.isNaN(lastUpdate.getTime())) return ""
    lastUpdate.setMinutes(0, 0, 0) // startOf("hour")
    return relativeTimeFromNow(lastUpdate)
  }

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
          Last update: <span>{formatLastUpdate()}</span>
        </div>
      </SectionSubHeading>

      {!data && !error ? (
        <Skeleton className="mt-2 h-44 w-full rounded-xl" />
      ) : (
        <>
          <Overview data={data} />
          <CodingActiveList data={data} />
        </>
      )}
    </section>
  )
}

export default CodingActive
