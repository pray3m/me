import type { NextPage } from "next"
import Container from "@/components/ds/container"
import { createMetadata, JsonLd, rootGraph } from "@/lib/seo"
import Home from "@/modules/home/components/Home"

export const metadata = createMetadata({ path: "/", socialImage: "route" })

// The Activity section reads GitHub + WakaTime, so the page is ISR rather than
// fully static. Same hourly cadence as /dashboard; visitors are still served a
// prerendered page from the edge cache.
export const revalidate = 3600

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
