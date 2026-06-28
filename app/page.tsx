import type { NextPage } from "next"
import Container from "@/components/ds/container"
import Reveal from "@/components/ds/reveal"
import { createMetadata } from "@/lib/seo"
import Home from "@/modules/home/components/Home"

export const metadata = createMetadata({ path: "/" })

const HomePage: NextPage = () => {
  return (
    <Container>
      <Reveal>
        <Home />
      </Reveal>
    </Container>
  )
}

export default HomePage
