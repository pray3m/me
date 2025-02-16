import type { MenuItemProps } from "@/common/lib/types";
import type { FC } from "react";
import MenuItem from "./MenuItem";

interface MenuProps {
  title?: string;
  list: MenuItemProps[];
}

const Menu: FC<MenuProps> = ({ title, list }) => {
  return (
    <div className="flex flex-col space-y-1">
      {title && (
        <div className="mb-2 ml-2 mt-1 hidden text-sm text-neutral-600 dark:text-neutral-500 lg:block">
          {title}
        </div>
      )}

      {list?.map((item: MenuItemProps, index: number) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Menu;
