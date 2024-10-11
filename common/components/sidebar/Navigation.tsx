import React, { FC } from "react";
import Menu from "./Menu";
import Breakline from "../elements/Breakline";
import { MENU_ITEMS, SOCIAL_MEDIA } from "@/common/constant/menu";

const Navigation: FC = () => {
  const filteredMenu = MENU_ITEMS.filter((item) => item?.visible);
  const filteredSocialMedia = SOCIAL_MEDIA.filter((item) => item?.visible);

  return (
    <div>
      <Menu list={filteredMenu} />
      <Breakline />
      <Menu title="Let's Connect" list={filteredSocialMedia} />
    </div>
  );
};

export default Navigation;
