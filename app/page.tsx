import type { NextPage } from "next"
import Container from "@/components/ds/container"
import { createMetadata } from "@/lib/seo"
import Home from "@/modules/home/components/Home"

export const metadata = createMetadata({
  path: "/",
  description:
    "Prem Gautam (pray3m) — full-stack engineer who designs and ships AI-driven products end to end, partnering with startups and companies to solve real digital problems. See my work and let's build yours.",
})

const HomePage: NextPage = () => {
  return (
    <Container>
      <Home />
    </Container>
  )
}

export default HomePage
