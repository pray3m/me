import { BiLineChart as AnalyticsIcon } from "react-icons/bi"
import Icon from "supercons"
import type { MenuItemProps } from "../lib/types"

const iconSize = 20
const iconSizeSocial = 18

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
    isShow: false,
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
    icon: <Icon glyph="channels" size={iconSizeSocial} />,
    isShow: true,
    isExternal: true,
  },
  {
    title: "Github",
    href: "https://github.com/pray3m",
    icon: <Icon glyph="github" size={iconSizeSocial} />,
    isShow: true,
    isExternal: true,
  },
  {
    title: "Instagram",
    href: "https://instagram.com/pray3m",
    icon: <Icon glyph="instagram" size={iconSizeSocial} />,
    isShow: true,
    isExternal: true,
  },
  {
    title: "Twitter",
    href: "https://twitter.com/pray3m_",
    icon: <Icon glyph="twitter" size={iconSizeSocial} />,
    isShow: true,
    isExternal: true,
  },
]

export const EXTERNAL_LINKS: MenuItemProps[] = [
  {
    title: "Analytics",
    href: "https://us.umami.is/share/9Kv5WwvTGEXVmx0W/premgautam.me",
    icon: <AnalyticsIcon size={iconSizeSocial} />,
    isShow: true,
    isExternal: true,
  },
]
