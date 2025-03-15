import Breakline from "@/common/components/elements/Breakline"
import React, { type FC } from "react"
import CodingActive from "./CodingActive"
import Contributions from "./Contributions"

const Dashboard: FC = () => {
  return (
    <>
      <Contributions />
      <Breakline className="mb-8 mt-10" />
      <CodingActive />
    </>
  )
}

export default Dashboard
