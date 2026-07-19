"use client"

import Link from "next/link"
import { type FC, useContext } from "react"
import { BiCommand as CommandIcon } from "react-icons/bi"
import { MENU_ITEMS, SOCIAL_MEDIA } from "@/common/constant/menu"
import { CommandPaletteContext } from "@/common/context/CommandPaletteContext"
import type { MenuItemProps } from "@/common/lib/types"
import Breakline from "@/components/ds/breakline"
import Menu from "./Menu"
import MenuItem from "./MenuItem"

interface NavigationProps {
  excludedHrefs?: string[]
}

function SocialLinks({ list }: { list: MenuItemProps[] }) {
  return (
    <div>
      <div className="mt-1 mb-2 ml-2 hidden text-muted-foreground text-sm lg:block">
        Let&apos;s Connect
      </div>
      <div className="flex items-center gap-2 px-1">
        {list.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener"
            aria-label={item.title}
            title={item.title}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}

const Navigation: FC<NavigationProps> = ({ excludedHrefs = [] }) => {
  const { setIsOpen } = useContext(CommandPaletteContext)

  const filteredMenu = MENU_ITEMS?.filter(
    (item) => item?.isShow && !excludedHrefs.includes(item.href)
  )
  const filteredSocialMedia = SOCIAL_MEDIA?.filter((item) => item?.isShow)

  const handleOpenCommandPalette = () => {
    setIsOpen(true)
  }

  return (
    <div>
      <Menu list={filteredMenu} />

      <div className="pt-1">
        <MenuItem
          title="cmd + k"
          href="#"
          icon={<CommandIcon size={20} />}
          isExternal={false}
          onClick={() => handleOpenCommandPalette()}
        >
          <div className="relative inline-flex items-center rounded-full bg-green-200 px-2 py-0.5 font-medium text-[10px] text-green-800">
            <span>AI Powered</span>
          </div>
        </MenuItem>
      </div>

      <Breakline className="my-3" />
      <SocialLinks list={filteredSocialMedia} />
    </div>
  )
}

export default Navigation
