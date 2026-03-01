"use client"

import { type FC, useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { MenuContext } from "@/common/context/MenuContext"
import Status from "@/components/blocks/Status"
import useHasMounted from "@/hooks/use-has-mounted"
import { cn } from "@/lib/utils"
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

  if (!hasMounted) return null

  const imageSize = isCompact ? 40 : 100

  const hideNavbar = () => {
    setExpandMenu(false)
  }

  return (
    <MenuContext.Provider value={{ hideNavbar }}>
      <div
        className={cn(
          "fixed z-10 w-full border-border border-b bg-background p-5 shadow-xs lg:relative lg:border-none lg:bg-transparent! lg:p-0 xl:shadow-none"
        )}
      >
        <div className="flex items-center justify-between lg:flex-col lg:items-start lg:space-y-3">
          <ProfileHeader imageSize={imageSize} />
          {!isCompact && <Status />}

          {/* RY: new profile avatar design idea  */}
          {/* {!isMobile && (
            <div className="fixed top-0 flex flex-col gap-2 px-6 py-8 max-w-[214px] xl:min-w-[214px] items-center text-center rounded-b-2xl bg-neutral-100 border dark:border-none dark:bg-neutral-800">
              <Image
                src="/images/prem.jpg"
                alt="Ryan Aulia"
                width={expandMenu ? 75 : imageSize}
                height={expandMenu ? 75 : imageSize}
                className="rounded-full lg:hover:scale-105 mb-3"
              />
              <h2 className="flex-grow text-lg lg:text-xl font-medium">
                Prem Gautam
              </h2>
              <Status />
            </div>
          )} */}

          {isCompact && (
            <div className="flex items-center">
              <MobileMenuButton
                expandMenu={expandMenu}
                setExpandMenu={setExpandMenu}
              />
            </div>
          )}
        </div>

        {isCompact && (
          <MobileMenu open={expandMenu} onOpenChange={setExpandMenu} />
        )}
      </div>
    </MenuContext.Provider>
  )
}

export default Profile
