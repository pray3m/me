"use client"

import { type FC, useCallback, useEffect, useMemo, useState } from "react"
import { MenuContext } from "@/common/context/MenuContext"
import MobileMenu from "./MobileMenu"
import MobileMenuButton from "./MobileMenuButton"
import ProfileHeader from "./ProfileHeader"

// The only interactive part of the shell: the mobile top bar + its drawer.
// Hidden on desktop via CSS (lg:hidden) so the rest of the shell can stay
// server-rendered.
const MobileNav: FC = () => {
  const [expandMenu, setExpandMenu] = useState(false)

  useEffect(() => {
    document.body.style.overflow = expandMenu ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [expandMenu])

  const hideNavbar = useCallback(() => setExpandMenu(false), [])
  const menuValue = useMemo(() => ({ hideNavbar }), [hideNavbar])

  return (
    <MenuContext.Provider value={menuValue}>
      <div className="fixed z-10 w-full border-border border-b bg-background p-5 shadow-xs lg:hidden">
        <div className="flex items-center justify-between">
          <ProfileHeader imageSize={40} />
          <div className="flex items-center">
            <MobileMenuButton
              expandMenu={expandMenu}
              setExpandMenu={setExpandMenu}
            />
          </div>
        </div>

        <MobileMenu open={expandMenu} onOpenChange={setExpandMenu} />
      </div>
    </MenuContext.Provider>
  )
}

export default MobileNav
