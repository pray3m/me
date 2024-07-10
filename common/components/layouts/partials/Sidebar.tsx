import clsx from "clsx";
import React from "react";
import Profile from "../../sidebar/Profile";
import Breakline from "../../elements/Breakline";
import Navigation from "../../sidebar/Navigation";

const Sidebar = () => {
  return (
    <div className={clsx(" sticky top-0 z-10 flex flex-col m-0 lg:mt-6")}>
      <Profile />
      <>
        <Breakline />
        <Navigation />
        <Breakline />
        <p>Dark Mode toggle</p>
      </>
    </div>
  );
};

export default Sidebar;
