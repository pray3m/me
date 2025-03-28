"use client"

import SectionHeading from "@/common/components/elements/SectionHeading"
import SectionSubHeading from "@/common/components/elements/SectionSubHeading"
import { fetcher } from "@/services/fetcher"
import Link from "next/link"
import React, { type FC } from "react"
import { BsGithub } from "react-icons/bs"
import useSWR from "swr"
import Calendar from "./Calendar"
import Overview from "./Overview"

const Contributions: FC = () => {
  const { data, error } = useSWR("api/github", fetcher)

  const contributionCalendar =
    data?.contributionsCollection?.contributionCalendar

  return (
    <section className="flex flex-col gap-y-2">
      <SectionHeading
        title="Contributions"
        icon={<BsGithub className="mr-1" />}
      />

      <SectionSubHeading>
        <p className="dark:text-neutral-400">
          My Github Contributions from last year.
        </p>
        <Link
          href={"https://github.com/pray3m"}
          target="_blank"
          passHref
          className="hover:text-netral-700 font-mono text-sm text-neutral-400 dark:text-neutral-600 dark:hover:text-neutral-400"
        >
          @pray3m
        </Link>
      </SectionSubHeading>

      {!data && <div className="dark:text-neutral-400">No Data</div>}

      {data && (
        <div className="space-y-3">
          <Overview data={contributionCalendar} />
          <Calendar data={contributionCalendar} />
        </div>
      )}
    </section>
  )
}

export default Contributions
