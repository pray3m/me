import type { Metadata, NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import About from "@/modules/about/components/About"

export const metadata: Metadata = {
  title: "About - Prem Gautam",
}

const AboutPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading title="About" subtitle="Get to know me better." />
      <About />
    </Container>
  )
}

export default AboutPage
