import Link from "next/link"
import { usePathname } from "next/navigation"
import { type FC, useContext, useState } from "react"
import { BsArrowRightShort as ExternalLinkIcon } from "react-icons/bs"
import { MenuContext } from "@/common/context/MenuContext"
import type { MenuItemProps } from "@/common/lib/types"

const MenuItem: FC<MenuItemProps> = ({
  title,
  icon,
  href,
  onClick,
  className,
  children,
}) => {
  const { hideNavbar } = useContext(MenuContext)

  const [isHovered, setIsHovered] = useState<boolean>(false)
  const isExternalUrl = href?.includes("http")
  const _targetUrl = isExternalUrl ? "_blank" : ""
  const pathname = usePathname()
  const isCurrentPath = pathname === href

  const isHashLink = href === "#"

  const activeClasses = `flex items-center gap-2 py-2 px-4 text-muted-foreground hover:text-foreground ${
    isCurrentPath
      ? "bg-muted rounded-lg text-brand"
      : "rounded-lg hover:bg-muted lg:transform-gpu lg:transition-[transform,background-color,color] lg:duration-200 lg:ease-out lg:hover:scale-[1.01]"
  }`

  const handleClick = () => {
    hideNavbar()
    if (onClick) onClick()
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const elementProps = {
    className: `${activeClasses} ${className}`,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  const itemComponent = () => {
    return (
      <div {...elementProps}>
        <div>{icon}</div>
        <div className="ml-0.5 flex-grow">{title}</div>
        {children && <>{children}</>}
        {isExternalUrl && isHovered && (
          <ExternalLinkIcon
            size={22}
            className="-rotate-45 text-muted-foreground lg:transition-all lg:duration-300"
          />
        )}
      </div>
    )
  }

  return isHashLink ? (
    <div className="cursor-pointer">{itemComponent()}</div>
  ) : (
    <Link
      href={href}
      target={isExternalUrl ? "_blank" : ""}
      rel={isExternalUrl ? "noopener" : undefined}
      onClick={handleClick}
      className="block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {itemComponent()}
    </Link>
  )
}

export default MenuItem
