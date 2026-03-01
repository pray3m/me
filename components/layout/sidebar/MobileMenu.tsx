import Link from "next/link"
import { usePathname } from "next/navigation"
import { type FC, useContext } from "react"
import Icon from "supercons"
import { MenuContext } from "@/common/context/MenuContext"
import ThemeToggleButton from "@/components/blocks/ThemeToggleButton"
import Breakline from "@/components/ds/breakline"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import Navigation from "./Navigation"

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MobileMenu: FC<MobileMenuProps> = ({ open, onOpenChange }) => {
  const { hideNavbar } = useContext(MenuContext)
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <DrawerContent
        className="max-h-[86dvh] rounded-b-none border-border/80 bg-background px-5 pt-0 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] shadow-[0_-12px_35px_rgba(0,0,0,0.22)] sm:inset-x-4 sm:mx-auto sm:max-w-2xl sm:rounded-t-[34px] sm:rounded-b-none sm:border lg:hidden"
        handleClassName="mt-2.5 mb-1.5 h-1 w-20 rounded-full bg-neutral-400 dark:bg-neutral-500"
      >
        <DrawerTitle className="sr-only">Mobile navigation menu</DrawerTitle>
        <Navigation excludedHrefs={[isHome ? "/dashboard" : "/"]} />

        <Breakline className="mt-3 mb-4" />

        <div className="sticky bottom-0 -mx-5 border-border/60 border-t bg-background/95 px-5 pt-3 backdrop-blur supports-backdrop-filter:bg-background/80">
          <div className="grid grid-cols-[auto_1fr] items-center gap-3">
            <div className="inline-flex h-13 w-13 items-center justify-center rounded-2xl">
              <ThemeToggleButton />
            </div>
            <Link
              href={isHome ? "/dashboard" : "/"}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-secondary px-4 font-medium text-foreground transition-colors hover:bg-secondary/85"
              onClick={hideNavbar}
            >
              <Icon glyph={isHome ? "grid" : "home"} size={18} />
              <span>{isHome ? "Dashboard" : "Home"}</span>
            </Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileMenu
