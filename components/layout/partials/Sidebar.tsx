"use client"

import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import ThemeToggle from "@/components/blocks/ThemeToggle"
import Breakline from "@/components/ds/breakline"
import Navigation from "@/components/layout/sidebar/Navigation"
import Profile from "@/components/layout/sidebar/Profile"
import useHasMounted from "@/hooks/use-has-mounted"

const Sidebar = () => {
  const isCompact = useMediaQuery("(max-width: 1023px)")
  const [_isSticky, setIsSticky] = useState<boolean>(false)

  const hasMounted = useHasMounted()

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.getElementById("sidebar")
      if (sidebar) {
        const { top } = sidebar.getBoundingClientRect()
        setIsSticky(top <= 0)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!hasMounted) return null

  return (
    <div
      id="sidebar"
      className="sticky top-0 z-10 flex flex-col transition-all duration-300 lg:py-14"
    >
      <Profile />
      {!isCompact && (
        <>
          <Breakline />
          <Navigation />
          <Breakline />
          <ThemeToggle />
        </>
      )}
    </div>
  )
}

export default Sidebar
