import Icon from "supercons";
import { MenuItemProps } from "../utils/types";

const iconSize = 26;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    name: "Home",
    href: "/",
    icon: <Icon glyph="home" size={iconSize} />,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Icon glyph="explore" size={iconSize} />,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: <Icon glyph="tv" size={iconSize} />,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: <Icon glyph="post" size={iconSize} />,
  },
  {
    name: "Tools",
    href: "/tools",
    icon: <Icon glyph="bug" size={iconSize} />,
  },
  {
    name: "About",
    href: "/about",
    icon: <Icon glyph="profile" size={iconSize} />,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <Icon glyph="email" size={iconSize} />,
  },
];

export const SOCIAL_MEDIA: MenuItemProps[] = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/pray3m/",
    icon: <Icon glyph="channels" size={iconSize} />,
  },
  {
    name: "Github",
    href: "https://github.com/pray3m",
    icon: <Icon glyph="github" size={iconSize} />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/pray3m",
    icon: <Icon glyph="instagram" size={iconSize} />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/pray3m_",
    icon: <Icon glyph="twitter" size={iconSize} />,
  },
];
