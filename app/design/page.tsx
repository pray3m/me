import type { NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import Reveal from "@/components/ds/reveal"
import { createMetadata } from "@/lib/seo"
import StyleGuide from "@/modules/design/components/StyleGuide"

export const metadata = createMetadata({
  title: "Design",
  description:
    "The design system behind premgautam.me — color tokens, type scale, and components.",
  path: "/design",
  noIndex: true,
})

const DesignPage: NextPage = () => (
  <Container>
    <Reveal>
      <PageHeading
        title="Design"
        subtitle="The tokens, type, and components behind this site."
      />
      <StyleGuide />
    </Reveal>
  </Container>
)

export default DesignPage
