"use client"

import moment from "moment"
import Link from "next/link"
import type { FC } from "react"
import { SiWakatime as WakatimeIcon } from "react-icons/si"
import useSWR from "swr"
import SectionHeading from "@/common/components/elements/SectionHeading"
import SectionSubHeading from "@/common/components/elements/SectionSubHeading"
import { fetcher } from "@/services/fetcher"
import CodingActiveList from "./CodingActiveList"
import Overview from "./Overview"

const CodingActive: FC = () => {
  const { data } = useSWR("/api/wakatime", fetcher)

  const formatLastUpdate = (): string => {
    const lastUpdate = moment(data?.last_update)
    if (lastUpdate.isValid()) {
      return lastUpdate.startOf("hour").fromNow()
    }
    return ""
  }

  return (
    <section className="flex flex-col gap-y-2">
      <SectionHeading
        title="Monthly Statistics"
        icon={<WakatimeIcon className="mr-1" />}
      />

      <SectionSubHeading>
        <div className="md:flex-row md:items-center dark:text-neutral-400">
          <span>My </span>
          <Link
            href="https://wakatime.com/@pray3m"
            className="hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
          >
            WakaTime
          </Link>
          <span> last 30 days stats.</span>
        </div>
        <div className="text-neutral-600 text-sm dark:text-neutral-500">
          Last update: <span>{formatLastUpdate()}</span>
        </div>
      </SectionSubHeading>

      <Overview data={data} />
      <CodingActiveList data={data} />
    </section>
  )
}

export default CodingActive
