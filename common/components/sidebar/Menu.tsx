import { MenuItemProps } from "@/common/utils/types";
import React from "react";
import MenuItem from "./MenuItem";

interface MenuProps {
  list: MenuItemProps[];
}

const Menu = ({ list }: MenuProps) => {
  return (
    <div>
      {list?.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Menu;
