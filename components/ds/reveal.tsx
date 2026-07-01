"use client"

import {
  type HTMLMotionProps,
  m,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

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

// Strong ease-out (easing.dev). The built-in "easeOut" is too weak to read as
// intentional — this gives the entrance an immediate, snappy feel.
const EASE_OUT = [0.23, 1, 0.32, 1] as const

/**
 * Scroll-triggered fade-up — the framer-motion replacement for AOS. Content
 * renders visible on first paint (no JS dependency, no flash), and only
 * below-the-fold elements are armed to fade up as they scroll into view.
 */
const Reveal = ({ delay = 0, as = "div", children, ...props }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const prefersReducedMotion = useReducedMotion()
  const [primed, setPrimed] = useState(false)
  const MotionTag = m[as] as typeof m.div

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Only arm the reveal for content that starts off-screen, so the first
    // paint is never gated behind JS.
    if (el.getBoundingClientRect().top > window.innerHeight) setPrimed(true)
  }, [])

  const hidden = primed && !inView && !prefersReducedMotion

  return (
    <MotionTag
      ref={ref}
      initial={false}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 12 : 0 }}
      transition={
        hidden ? { duration: 0 } : { duration: 0.4, ease: EASE_OUT, delay }
      }
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal
