"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { type FC } from "react"
import { BsGithub } from "react-icons/bs"
import SectionHeading from "@/components/ds/section-heading"
import SectionSubHeading from "@/components/ds/section-sub-heading"
import Skeleton from "@/components/ds/skeleton"
import { fetcher } from "@/services/fetcher"
import Calendar from "./Calendar"
import Overview from "./Overview"

const Contributions: FC = () => {
  const { data, error } = useQuery({
    queryKey: ["github"],
    queryFn: () => fetcher("/api/github"),
  })

  const contributionCalendar =
    data?.contributionsCollection?.contributionCalendar

  return (
    <section className="flex flex-col gap-y-2">
      <SectionHeading
        title="Contributions"
        icon={<BsGithub className="mr-1" />}
      />

      <SectionSubHeading>
        <p className="text-muted-foreground">
          My Github Contributions from last year.
        </p>
        <Link
          href={"https://github.com/pray3m"}
          target="_blank"
          rel="noopener noreferrer"
          passHref
          className="font-mono text-muted-foreground text-sm hover:text-foreground"
        >
          @pray3m
        </Link>
      </SectionSubHeading>

      {!data && !error && <Skeleton className="mt-2 h-32 w-full rounded-xl" />}

      {error && (
        <p className="text-muted-foreground text-sm">
          Couldn&apos;t load contributions right now.
        </p>
      )}

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
