import type { FC } from "react"
import Breakline from "@/components/ds/breakline"
import CareerList from "./CareerList"
import Credentials from "./Credentials"
import Story from "./Story"

const About: FC = () => {
  return (
    <>
      <Story />
      <Breakline className="my-8" />
      <CareerList />
      <Breakline className="my-8" />
      <Credentials />
    </>
  )
}

export default About
