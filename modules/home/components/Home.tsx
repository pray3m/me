import Breakline from "@/common/components/elements/Breakline";
import { FC } from "react";
import Introduction from "./Introduction";

const Home: FC = () => {
  return (
    <>
      <Introduction />
      <Breakline className="my-8" />
      <div className="h-full">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quo velit
        maiores, illum totam porro similique rerum nostrum eligendi dolor.
      </div>
    </>
  );
};

export default Home;
