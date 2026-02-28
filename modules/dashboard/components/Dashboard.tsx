import { type FC } from "react"
import Breakline from "@/components/ds/breakline"
import CodingActive from "./CodingActive"
import Contributions from "./Contributions"

const Dashboard: FC = () => {
  return (
    <>
      <Contributions />
      <Breakline className="mt-10 mb-8" />
      <CodingActive />
    </>
  )
}

export default Dashboard
