"use client"

import { MenuContext } from "@/common/context/MenuContext"
import useHasMounted from "@/common/hooks/use-has-mounted"
import useIsMobile from "@/common/hooks/use-is-mobile"
import { cn } from "@/common/lib/utils"
import clsx from "clsx"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import { type FC, useState } from "react"
import Status from "../elements/Status"
import ThemeToggleButton from "../elements/ThemeToggleButton"
import MobileMenu from "./MobileMenu"
import MobileMenuButton from "./MobileMenuButton"
import ProfileHeader from "./ProfileHeader"

const Profile: FC = () => {
  const isMobile = useIsMobile()
  const [expandMenu, setExpandMenu] = useState<boolean>(false)

  const hasMounted = useHasMounted()
  if (!hasMounted) return null

  const imageSize = isMobile ? 40 : 100

  const hideNavbar = () => {
    setExpandMenu(false)
  }

  return (
    <MenuContext.Provider value={{ hideNavbar }}>
      <div
        className={cn(
          "absolute z-10 w-full bg-light p-5 shadow-xs dark:border-b dark:border-neutral-800 dark:bg-dark lg:relative lg:border-none lg:bg-transparent! lg:p-0 xl:shadow-none",
          expandMenu && "pb-0"
        )}
      >
        <div className="flex items-center justify-between lg:flex-col lg:items-start lg:space-y-3">
          <ProfileHeader expandMenu={expandMenu} imageSize={imageSize} />
          {!isMobile && <Status />}

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

          {isMobile && (
            <div
              className={clsx(
                "flex items-center gap-5",
                expandMenu &&
                  "!items-end flex-col-reverse justify-between h-[120px]"
              )}
            >
              <ThemeToggleButton />
              <MobileMenuButton
                expandMenu={expandMenu}
                setExpandMenu={setExpandMenu}
              />
            </div>
          )}
        </div>

        {isMobile && (
          <AnimatePresence>{expandMenu && <MobileMenu />}</AnimatePresence>
        )}
      </div>
    </MenuContext.Provider>
  )
}

export default Profile
