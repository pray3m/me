import { MenuItemProps } from "@/common/utils/types";
import React from "react";

const MenuItem = ({ name, icon, href }: MenuItemProps) => {
  const isExternal = href?.includes("http");

  return (
    <div>
      <div>
        <div>{icon}</div>
        <div>{name}</div>

        {isExternal && <p> external icon </p>}
      </div>
    </div>
  );
};

export default MenuItem;
