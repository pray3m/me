"use client"

import { useTheme } from "next-themes"
import { type FC, useRef } from "react"
import Icon from "supercons"
import useHasMounted from "@/hooks/use-has-mounted"

const ThemeToggle: FC = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const hasMounted = useHasMounted()
  const buttonRef = useRef<HTMLButtonElement>(null)

  if (!hasMounted) return null

  const isDarkMode = resolvedTheme === "dark"

  const handleToggle = () => {
    if (buttonRef.current) {
      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2

      // Set CSS variables for the bubble position
      document.documentElement.style.setProperty("--bubble-x", `${x}px`)
      document.documentElement.style.setProperty("--bubble-y", `${y}px`)
    }

    document.startViewTransition(() => {
      setTheme(isDarkMode ? "light" : "dark")
    })
  }

  return (
    <button
      onClick={handleToggle}
      ref={buttonRef}
      type="button"
      className="flex w-full items-center gap-2 px-3 py-2 text-neutral-700 hover:text-neutral-900 lg:transition-all lg:duration-300 lg:hover:scale-105 lg:hover:rounded-lg lg:hover:bg-gray-200 dark:text-neutral-400 dark:hover:text-neutral-300 lg:dark:hover:bg-zinc-800"
    >
      <Icon glyph={isDarkMode ? "sun-fill" : "moon-fill"} size={22} />
      <div className="flex">{isDarkMode ? "Light Mode" : "Dark Mode"}</div>
    </button>
  )
}

export default ThemeToggle
