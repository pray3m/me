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
        className="inline-flex h-9 w-9 items-center justify-center hover:text-gray-900 dark:hover:text-white"
        onClick={() => setExpandMenu(!expandMenu)}
      >
        {!expandMenu ? <Menu size={34} /> : <X size={34} />}
      </button>
    </div>
  )
}

export default MobileMenuButton
