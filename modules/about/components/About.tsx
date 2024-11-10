import Breakline from "@/common/components/elements/Breakline";
import { FC } from "react";
import CareerList from "./CareerList";
import Story from "./Story";

const About: FC = () => {
  return (
    <>
      <Story />
      <Breakline className="my-8" />
      <CareerList />
    </>
  );
};

export default About;
