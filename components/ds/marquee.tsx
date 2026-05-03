import { type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: ReactNode
  className?: string
  duration?: string
  delay?: string
  reverse?: boolean
}

const Marquee = ({
  children,
  className,
  duration = "24s",
  delay = "0s",
  reverse = false,
}: MarqueeProps) => {
  return (
    <div
      className={cn("flex overflow-hidden", className)}
      data-slot="marquee"
      role="presentation"
    >
      <div
        className="flex w-max transform-gpu animate-marquee will-change-transform motion-reduce:animate-none hover:[animation-play-state:paused] data-[reverse=true]:[animation-direction:reverse]"
        data-reverse={reverse ? "true" : undefined}
        style={
          {
            "--marquee-duration": duration,
            "--marquee-delay": delay,
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 gap-3 pr-3">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 gap-3 pr-3">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Marquee
