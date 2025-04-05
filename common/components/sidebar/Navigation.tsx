import { MENU_ITEMS, SOCIAL_MEDIA } from "@/common/constant/menu"
import { CommandPaletteContext } from "@/common/context/CommandPaletteContext"
import React, { useContext, type FC } from "react"
import { BiCommand as CommandIcon } from "react-icons/bi"
import Breakline from "../elements/Breakline"
import Menu from "./Menu"
import MenuItem from "./MenuItem"

const Navigation: FC = () => {
  const { setIsOpen } = useContext(CommandPaletteContext)

  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow)
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
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-200 text-green-700 border-green-700">
            Try Now
          </span>
        </MenuItem>
      </div>

      <Breakline />
      <Menu title="Let's Connect" list={filteredSocialMedia} />
    </div>
  )
}

export default Navigation
