import { ReactNode } from "react";

export interface MenuItemProps {
  name: string;
  href: string;
  icon: ReactNode;
}

export interface BlogItemProps {
  title: string;
  category: string;
  image: string;
  views: number;
  date: string;
  content: string;
  slug: string;
}

export interface BlogProps {
  blogs: BlogItemProps[];
}
