import React from "react";
import Menu from "./Menu";
import Breakline from "../elements/Breakline";
import { MENU_ITEMS, SOCIAL_MEDIA } from "@/common/constant/menu";

const Navigation = () => {
  return (
    <div>
      <Menu list={MENU_ITEMS} />
      <Breakline />
      <Menu list={SOCIAL_MEDIA} />
    </div>
  );
};

export default Navigation;
