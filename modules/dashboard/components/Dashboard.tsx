import PageHeading from "@/common/components/elements/PageHeading";
import React, { FC } from "react";
import Contributions from "./Contributions";
import Breakline from "@/common/components/elements/Breakline";
import CodingActive from "./CodingActive";

const Dashboard: FC = () => {
  return (
    <>
      <PageHeading
        title="Dashboard"
        subtitle="This is my personal dashboard, built with Next.js API routes deployed as serverless functions."
      />

      <Contributions />
      <Breakline className="mt-10 mb-8" />
      <CodingActive />
    </>
  );
};

export default Dashboard;
