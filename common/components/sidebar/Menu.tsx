import { MenuItemProps } from "@/common/utils/types";
import { FC } from "react";
import MenuItem from "./MenuItem";

interface MenuProps {
  list: MenuItemProps[];
}

const Menu: FC<MenuProps> = ({ list }) => {
  return (
    <div className="flex flex-col space-y-1">
      {list?.map((item: MenuItemProps, index: number) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Menu;
