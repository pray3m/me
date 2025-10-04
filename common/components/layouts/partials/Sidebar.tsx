"use client"

import { useEffect, useState } from "react"
import useHasMounted from "@/common/hooks/use-has-mounted"
import useIsMobile from "@/common/hooks/use-is-mobile"
import Breakline from "../../elements/Breakline"
import ThemeToggle from "../../elements/ThemeToggle"
import Navigation from "../../sidebar/Navigation"
import Profile from "../../sidebar/Profile"

const Sidebar = () => {
  const isMobile = useIsMobile()
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
      {!isMobile && (
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
