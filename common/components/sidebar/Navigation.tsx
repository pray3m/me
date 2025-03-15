import { MENU_ITEMS, SOCIAL_MEDIA } from "@/common/constant/menu"
import React, { type FC } from "react"
import Breakline from "../elements/Breakline"
import Menu from "./Menu"

const Navigation: FC = () => {
  const filteredMenu = MENU_ITEMS.filter((item) => item?.visible)
  const filteredSocialMedia = SOCIAL_MEDIA.filter((item) => item?.visible)

  return (
    <div>
      <Menu list={filteredMenu} />
      <Breakline />
      <Menu title="Let's Connect" list={filteredSocialMedia} />
    </div>
  )
}

export default Navigation
