import {
  Bug,
  Compass,
  Home,
  LayoutGrid,
  Mail,
  Newspaper,
  User,
} from "lucide-react"
import { BiLineChart as AnalyticsIcon } from "react-icons/bi"
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6"
import type { MenuItemProps } from "../lib/types"

const iconSize = 20
const iconSizeSocial = 18

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutGrid size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <Compass size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: <Newspaper size={iconSize} />,
    isShow: false,
    isExternal: false,
  },
  {
    title: "Tools",
    href: "/tools",
    icon: <Bug size={iconSize} />,
    isShow: false,
    isExternal: false,
  },
  {
    title: "About",
    href: "/about",
    icon: <User size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Mail size={iconSize} />,
    isShow: true,
    isExternal: false,
  },
]

export const SOCIAL_MEDIA: MenuItemProps[] = [
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/in/pray3m/",
    icon: <FaLinkedin size={iconSizeSocial} />,
    isShow: true,
    isExternal: true,
  },
  {
    title: "Github",
    href: "https://github.com/pray3m",
    icon: <FaGithub size={iconSizeSocial} />,
    isShow: true,
    isExternal: true,
  },
  {
    title: "Instagram",
    href: "https://instagram.com/pray3m",
    icon: <FaInstagram size={iconSizeSocial} />,
    isShow: true,
    isExternal: true,
  },
  {
    title: "Twitter",
    href: "https://twitter.com/pray3m_",
    icon: <FaXTwitter size={iconSizeSocial} />,
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
