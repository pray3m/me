import { type FC, useContext } from "react"
import { BiCommand as CommandIcon } from "react-icons/bi"
import { MENU_ITEMS, SOCIAL_MEDIA } from "@/common/constant/menu"
import { CommandPaletteContext } from "@/common/context/CommandPaletteContext"
import Breakline from "@/components/ds/breakline"
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
          <div className="relative inline-flex items-center rounded-full bg-green-200 px-2 py-0.5 font-medium text-[10px] text-green-800">
            <span>AI Powered</span>
          </div>
        </MenuItem>
      </div>

      <Breakline />
      <Menu title="Let's Connect" list={filteredSocialMedia} />
    </div>
  )
}

export default Navigation
