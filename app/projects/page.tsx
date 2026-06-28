import type { NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import Reveal from "@/components/ds/reveal"
import { createMetadata } from "@/lib/seo"
import Projects from "@/modules/projects/components/Projects"

export const metadata = createMetadata({
  title: "Projects",
  description:
    "A showcase of projects by Prem Gautam — web apps, SaaS products, and experiments spanning Next.js, Node.js, and beyond.",
  path: "/projects",
})

const ProjectsPage: NextPage = () => {
  return (
    <Container>
      <Reveal>
        <PageHeading
          title="Projects"
          subtitle="Showcasing my passion for technology, design, and problem-solving through code"
        />
        <Projects />
      </Reveal>
    </Container>
  )
}

export default ProjectsPage
