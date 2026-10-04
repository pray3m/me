"use client"

import { Clock } from "lucide-react"
import type { FC } from "react"
import useClock from "@/hooks/use-clock"
import { formatNepalTime } from "@/lib/date"

const WIDTH_RESERVE = "00:00 AM"

const LocalTime: FC = () => {
  const now = useClock()

  return (
    <span className="inline-flex items-center gap-1.5">
      <Clock aria-hidden="true" className="size-4" />
      <span className="tabular-nums">
        {now ? (
          <>
            {formatNepalTime(now)} local
            <span className="sr-only"> time in Butwal, Nepal</span>
          </>
        ) : (
          <span aria-hidden="true" className="invisible">
            {WIDTH_RESERVE} local
          </span>
        )}
      </span>
    </span>
  )
}

export default LocalTime
