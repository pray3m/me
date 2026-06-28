import { useTheme } from "next-themes"
import { useId, useRef } from "react"
import useHasMounted from "@/hooks/use-has-mounted"
import "./theme-toggle.css"

const ThemeToggleButton = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const hasMounted = useHasMounted()
  const buttonRef = useRef<HTMLDivElement>(null)
  const inputId = useId()

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

    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        setTheme(isDarkMode ? "light" : "dark")
      })
      return
    }

    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <div ref={buttonRef} className="theme-toggle">
      <input
        checked={resolvedTheme === "dark"}
        type="checkbox"
        aria-label="Toggle dark mode"
        className="mode-toggle"
        id={inputId}
        onChange={handleToggle}
      />
      <label className="mode-toggle-label" htmlFor={inputId}>
        <svg
          width="50"
          height="30"
          viewBox="0 0 300 180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Theme toggle button icon</title>
          <defs>
            <linearGradient id="bg-night">
              <stop className="bg-stop-start" offset="0%" />
              <stop className="bg-stop-end" offset="100%" />
            </linearGradient>
            <filter id="glow">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="8"
                floodColor="#ffffff"
                floodOpacity="0.75"
              />
            </filter>
            <filter id="glow-mini">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="0.5"
                floodColor="#ffffff"
                floodOpacity="0.5"
              />
            </filter>
          </defs>
          <rect
            className="bg"
            width="300"
            height="180"
            rx="90"
            ry="90"
            fill="url(#bg-night)"
          />
          <circle
            className="source"
            cx="0"
            cy="0"
            r="70"
            fill="#ffffff"
            style={{ filter: "url(#glow)" }}
          />
          <g className="stars">
            <circle
              className="star-1"
              cx="190"
              cy="50"
              r="4"
              fill="#ffffff"
              style={{ filter: "url(#glow-mini)" }}
            />
            <circle
              className="star-2"
              cx="250"
              cy="70"
              r="4"
              fill="#ffffff"
              style={{ filter: "url(#glow-mini)" }}
            />
            <circle
              className="star-3"
              cx="220"
              cy="130"
              r="6"
              fill="#ffffff"
              style={{ filter: "url(#glow-mini)" }}
            />
          </g>
        </svg>
      </label>
    </div>
  )
}

export default ThemeToggleButton
