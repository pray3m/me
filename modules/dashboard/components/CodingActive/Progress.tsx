"use client"

import clsx from "clsx"
import { m, type Variants } from "framer-motion"
import type { FC } from "react"

interface ProgressProps {
  data: { name: string; percent?: number }
  className?: string
}

const Progress: FC<ProgressProps> = ({ data, className }) => {
  const { name, percent = 0 } = data

  const progressVariants: Variants = {
    initial: { width: 0 },
    animate: {
      width: `${percent}%`,
      transition: { delay: 0.8 },
    },
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="w-24">{name}</div>
      <div className="relative flex h-3 flex-1 justify-center rounded-full bg-muted">
        <m.span
          initial="initial"
          animate="animate"
          variants={progressVariants}
          className={clsx(
            className,
            "absolute top-0 left-0 h-3 rounded-full px-3"
          )}
        >
          &ensp;
        </m.span>
      </div>
      <div className="w-8 text-right text-muted-foreground">
        {percent.toFixed(0)}%
      </div>
    </div>
  )
}

export default Progress
