import type { Metadata, NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import StyleGuide from "@/modules/design/components/StyleGuide"

export const metadata: Metadata = {
  title: "Design — Prem Gautam",
  description:
    "The design system behind premgautam.me — color tokens, type scale, and components.",
}

const DesignPage: NextPage = () => (
  <Container data-aos="fade-up">
    <PageHeading
      title="Design"
      subtitle="The tokens, type, and components behind this site."
    />
    <StyleGuide />
  </Container>
)

export default DesignPage
