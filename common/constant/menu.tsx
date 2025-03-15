import Icon from "supercons"
import type { MenuItemProps } from "../lib/types"

const iconSize = 26

export const MENU_ITEMS: MenuItemProps[] = [
  {
    name: "Home",
    href: "/",
    icon: <Icon glyph="home" size={iconSize} />,
    visible: true,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Icon glyph="grid" size={iconSize} />,
    visible: true,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <Icon glyph="explore" size={iconSize} />,
    visible: true,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: <Icon glyph="post" size={iconSize} />,
    visible: true,
  },
  {
    name: "Tools",
    href: "/tools",
    icon: <Icon glyph="bug" size={iconSize} />,
    visible: false,
  },
  {
    name: "About",
    href: "/about",
    icon: <Icon glyph="profile" size={iconSize} />,
    visible: true,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <Icon glyph="email" size={iconSize} />,
    visible: true,
  },
]

export const SOCIAL_MEDIA: MenuItemProps[] = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/pray3m/",
    icon: <Icon glyph="channels" size={iconSize} />,
    visible: true,
  },
  {
    name: "Github",
    href: "https://github.com/pray3m",
    icon: <Icon glyph="github" size={iconSize} />,
    visible: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/pray3m",
    icon: <Icon glyph="instagram" size={iconSize} />,
    visible: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/pray3m_",
    icon: <Icon glyph="twitter" size={iconSize} />,
    visible: true,
  },
]
