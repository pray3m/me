import type { NextPage } from "next"
import Container from "@/components/ds/container"
import { createMetadata, JsonLd, rootGraph } from "@/lib/seo"
import Home from "@/modules/home/components/Home"

export const metadata = createMetadata({ path: "/", socialImage: "route" })

const HomePage: NextPage = () => {
  return (
    <>
      <JsonLd data={rootGraph()} />
      <Container>
        <Home />
      </Container>
    </>
  )
}

export default HomePage
