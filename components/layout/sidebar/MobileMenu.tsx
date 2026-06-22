import Link from "next/link"
import { usePathname } from "next/navigation"
import { type FC, useContext } from "react"
import { MENU_ITEMS, SOCIAL_MEDIA } from "@/common/constant/menu"
import { CommandPaletteContext } from "@/common/context/CommandPaletteContext"
import { MenuContext } from "@/common/context/MenuContext"
import ThemeToggleButton from "@/components/blocks/ThemeToggleButton"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MobileMenu: FC<MobileMenuProps> = ({ open, onOpenChange }) => {
  const { hideNavbar } = useContext(MenuContext)
  const { setIsOpen } = useContext(CommandPaletteContext)
  const pathname = usePathname()

  const navItems = MENU_ITEMS.filter((item) => item?.isShow)
  const socials = SOCIAL_MEDIA.filter((item) => item?.isShow)

  const openCommandPalette = () => {
    hideNavbar()
    setIsOpen(true)
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <DrawerContent className="max-h-[86dvh] rounded-b-none border-border/80 bg-background px-6 pt-0 pb-[calc(env(safe-area-inset-bottom)+1.1rem)] shadow-[0_-12px_35px_rgba(0,0,0,0.22)] sm:inset-x-4 sm:mx-auto sm:max-w-2xl sm:rounded-t-[34px] sm:rounded-b-none sm:border lg:hidden">
        <DrawerTitle className="sr-only">Mobile navigation menu</DrawerTitle>

        <nav className="mt-2 flex flex-col">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={hideNavbar}
                className={cn(
                  "border-border/60 border-b py-4 font-medium text-lg transition-colors last:border-b-0",
                  isActive
                    ? "text-brand"
                    : "text-foreground/90 hover:text-brand"
                )}
              >
                {item.title}
              </Link>
            )
          })}

          <button
            type="button"
            onClick={openCommandPalette}
            className="flex items-center justify-between py-4 font-medium text-foreground/90 text-lg transition-colors hover:text-brand"
          >
            <span>Command Menu</span>
            <span className="inline-flex items-center rounded-full bg-green-200 px-2 py-0.5 font-medium text-[10px] text-green-800">
              AI Powered
            </span>
          </button>
        </nav>

        <div className="mt-5 flex items-center justify-between border-border/60 border-t pt-4">
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.title}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.icon}
              </Link>
            ))}
          </div>
          <ThemeToggleButton />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileMenu
