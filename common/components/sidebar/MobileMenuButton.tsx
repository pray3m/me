import type { FC } from "react"
import Icon from "supercons"

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
        className="block hover:text-gray-900 dark:hover:text-white"
        onClick={() => setExpandMenu(!expandMenu)}
      >
        {!expandMenu ? (
          <Icon glyph="menu" size={34} />
        ) : (
          <Icon glyph="view-close" size={34} />
        )}
      </button>
    </div>
  )
}

export default MobileMenuButton
