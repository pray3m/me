import { Menu, X } from "lucide-react"
import type { FC } from "react"

interface MobileMenuButtonProps {
  expandMenu: boolean
  setExpandMenu: (expand: boolean) => void
}

const MobileMenuButton: FC<MobileMenuButtonProps> = ({
  expandMenu,
  setExpandMenu,
}) => {
  return (
    <div className="flex items-center justify-end lg:hidden">
      <button
        type="button"
        aria-label={
          expandMenu ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={expandMenu}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setExpandMenu(!expandMenu)}
      >
        {!expandMenu ? <Menu size={34} /> : <X size={34} />}
      </button>
    </div>
  )
}

export default MobileMenuButton
