import type { FC } from "react"
import Breakline from "@/components/ds/breakline"
import CareerList from "./CareerList"
import Story from "./Story"

const About: FC = () => {
  return (
    <>
      <Story />
      <Breakline className="my-8" />
      <CareerList />
    </>
  )
}

export default About
