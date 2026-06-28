import type { NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import Reveal from "@/components/ds/reveal"
import { createMetadata } from "@/lib/seo"
import About from "@/modules/about/components/About"

export const metadata = createMetadata({
  title: "About",
  description:
    "Get to know Prem Gautam — a full-stack developer based in Butwal, Nepal. Background, skills, experience, and the work that drives him.",
  path: "/about",
})

const AboutPage: NextPage = () => {
  return (
    <Container>
      <Reveal>
        <PageHeading title="About" subtitle="Get to know me better." />
        <About />
      </Reveal>
    </Container>
  )
}

export default AboutPage
