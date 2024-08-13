import Breakline from "@/common/components/elements/Breakline";
import { FC } from "react";
import Introduction from "./Introduction";
import BlogPreview from "./BlogPreview";

const Home: FC = () => {
  return (
    <>
      <Introduction />
      <Breakline className="my-8" />

      <BlogPreview />
      <Breakline className="my-8" />
    </>
  );
};

export default Home;
