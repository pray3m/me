import Breakline from "@/common/components/elements/Breakline";
import CodingActive from "./CodingActive";
import Contributions from "./Contributions";
import React, { FC } from "react";

const Dashboard: FC = () => {
  return (
    <>
      <Contributions />
      <Breakline className="mt-10 mb-8" />
      <CodingActive />
    </>
  );
};

export default Dashboard;
