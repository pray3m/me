import Breakline from "@/common/components/elements/Breakline";
import { FC } from "react";
import Introduction from "./Introduction";
import BlogPreview from "./BlogPreview";
import Services from "./Services";
import React from "react";

const Home: FC = () => {
  return (
    <>
      <Introduction />
      <Breakline className="mt-8 mb-6" />
      <BlogPreview />

      <Breakline className="my-8" />
      <Services />
    </>
  );
};

export default Home;
