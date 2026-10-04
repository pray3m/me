"use client"

import type { FC } from "react"
import useClock from "@/hooks/use-clock"
import { timeOfDayGreeting } from "@/lib/date"

const Greeting: FC = () => {
  const now = useClock()

  return (
    <h1 className="font-semibold text-2xl tracking-tight lg:text-3xl">
      <span className="mb-1 block font-handwriting font-medium text-[26px] text-foreground/80 tracking-normal lg:text-[30px]">
        {now ? (
          <span className="fade-in-0 slide-in-from-bottom-1 inline-block duration-500 motion-safe:animate-in">
            {timeOfDayGreeting(now)},
          </span>
        ) : (
          " "
        )}
      </span>
      <span className="block">
        I&apos;m Prem Gautam.{" "}
        <span
          aria-hidden="true"
          className="inline-block origin-[70%_70%] animate-waving-hand"
        >
          👋
        </span>
      </span>
    </h1>
  )
}

export default Greeting
