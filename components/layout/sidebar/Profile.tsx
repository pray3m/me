"use client"

import Link from "next/link"
import { type FC, useCallback, useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { MenuContext } from "@/common/context/MenuContext"
import Status from "@/components/blocks/Status"
import useHasMounted from "@/hooks/use-has-mounted"
import MobileMenu from "./MobileMenu"
import MobileMenuButton from "./MobileMenuButton"
import ProfileHeader from "./ProfileHeader"

const Profile: FC = () => {
  const isCompact = useMediaQuery("(max-width: 1023px)")
  const [expandMenu, setExpandMenu] = useState<boolean>(false)

  const hasMounted = useHasMounted()

  useEffect(() => {
    if (!hasMounted || !isCompact) return

    document.body.style.overflow = expandMenu ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [expandMenu, hasMounted, isCompact])

  const hideNavbar = useCallback(() => {
    setExpandMenu(false)
  }, [])

  const menuValue = useMemo(() => ({ hideNavbar }), [hideNavbar])

  if (!hasMounted) return null

  // Mobile (< lg): aulianza-style floating pill bar + a profile block below it.
  if (isCompact) {
    return (
      <MenuContext.Provider value={menuValue}>
        <div className="fixed inset-x-0 top-0 z-[60] px-4 pt-4">
          <nav className="flex items-center justify-between rounded-3xl border-2 border-[#e7f0ff] bg-black px-6 py-3.5 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] dark:border-[#e7f0ff] dark:bg-black">
            <Link
              href="/"
              className="font-semibold text-2xl text-white tracking-wide"
            >
              pray3m
            </Link>
            <MobileMenuButton
              expandMenu={expandMenu}
              setExpandMenu={setExpandMenu}
            />
          </nav>
        </div>

        <MobileMenu open={expandMenu} onOpenChange={setExpandMenu} />
      </MenuContext.Provider>
    )
  }

  // Desktop (>= lg): the sidebar profile, unchanged.
  return (
    <MenuContext.Provider value={menuValue}>
      <div className="relative w-full">
        <div className="flex flex-col items-start space-y-3">
          <ProfileHeader imageSize={100} />
          <Status />
        </div>
      </div>
    </MenuContext.Provider>
  )
}

export default Profile
