import Icon from "supercons"
import type { MenuItemProps } from "../lib/types"

const iconSize = 26

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: "Home",
    href: "/",
    icon: <Icon glyph="home" size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Icon glyph="grid" size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <Icon glyph="explore" size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: <Icon glyph="post" size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Tools",
    href: "/tools",
    icon: <Icon glyph="bug" size={iconSize} />,
    isShow: false,
    isExternal: false,
  },
  {
    title: "About",
    href: "/about",
    icon: <Icon glyph="profile" size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Icon glyph="email" size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
]

export const SOCIAL_MEDIA: MenuItemProps[] = [
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/in/pray3m/",
    icon: <Icon glyph="channels" size={iconSize} />,
    isShow: true,
    isExternal: true,
  },
  {
    title: "Github",
    href: "https://github.com/pray3m",
    icon: <Icon glyph="github" size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Instagram",
    href: "https://instagram.com/pray3m",
    icon: <Icon glyph="instagram" size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Twitter",
    href: "https://twitter.com/pray3m_",
    icon: <Icon glyph="twitter" size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
]
