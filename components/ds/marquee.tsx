import { type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: ReactNode
  className?: string
  duration?: string
  delay?: string
  repeat?: number
  reverse?: boolean
}

const Marquee = ({
  children,
  className,
  duration = "36s",
  delay = "0s",
  repeat = 3,
  reverse = false,
}: MarqueeProps) => {
  return (
    <div
      className={cn("flex overflow-hidden", className)}
      data-slot="marquee"
      role="presentation"
    >
      <div
        className="hover:paused data-[reverse=true]:direction-[reverse] flex w-max min-w-full transform-gpu animate-[skills-marquee_var(--skills-marquee-duration)_var(--skills-marquee-delay)_linear_infinite] will-change-transform motion-reduce:animate-none"
        data-reverse={reverse ? "true" : undefined}
        style={
          {
            "--skills-marquee-repeat": repeat,
            "--skills-marquee-duration": duration,
            "--skills-marquee-delay": delay,
          } as CSSProperties
        }
      >
        {Array.from({ length: repeat }, (_, index) => (
          <div
            key={index}
            aria-hidden={index > 0}
            className="flex shrink-0 gap-3 pr-3"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marquee
