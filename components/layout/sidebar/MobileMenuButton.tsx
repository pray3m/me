import type { FC } from "react"
import { cn } from "@/lib/utils"

interface MobileMenuButtonProps {
  expandMenu: boolean
  setExpandMenu: (expand: boolean) => void
}

const MobileMenuButton: FC<MobileMenuButtonProps> = ({
  expandMenu,
  setExpandMenu,
}) => {
  const lineClasses =
    "h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-out"

  return (
    <button
      type="button"
      aria-label={expandMenu ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={expandMenu}
      className="flex flex-col gap-1.5 p-2 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden"
      onClick={() => setExpandMenu(!expandMenu)}
    >
      <span
        className={cn(lineClasses, expandMenu && "translate-y-2 rotate-45")}
      />
      <span className={cn(lineClasses, expandMenu && "opacity-0")} />
      <span
        className={cn(lineClasses, expandMenu && "-translate-y-2 -rotate-45")}
      />
    </button>
  )
}

export default MobileMenuButton
