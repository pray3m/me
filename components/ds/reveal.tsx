"use client"

import { type HTMLMotionProps, m, useInView } from "framer-motion"
import { useRef } from "react"

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "span"
  | "ul"
  | "li"

interface RevealProps extends HTMLMotionProps<"div"> {
  /** Delay before the reveal starts, in seconds. */
  delay?: number
  /** Element to render as, so semantics (section/h1/p…) are preserved. */
  as?: RevealTag
}

/**
 * Scroll-triggered fade-up wrapper — the framer-motion replacement for AOS.
 * Uses `useInView` (IntersectionObserver) so it works regardless of the
 * LazyMotion feature bundle loaded in providers.
 */
const Reveal = ({ delay = 0, as = "div", children, ...props }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const MotionTag = m[as] as typeof m.div

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal
