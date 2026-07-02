import { Suspense } from "react"
import Breakline from "@/components/ds/breakline"
import Skeleton from "@/components/ds/skeleton"
import CodingActive from "./CodingActive"
import Contributions from "./Contributions"

const Dashboard = () => {
  return (
    <>
      <Suspense fallback={<Skeleton className="mt-2 h-64 w-full rounded-xl" />}>
        <Contributions />
      </Suspense>
      <Breakline className="mt-10 mb-8" />
      <Suspense fallback={<Skeleton className="mt-2 h-44 w-full rounded-xl" />}>
        <CodingActive />
      </Suspense>
    </>
  )
}

export default Dashboard
