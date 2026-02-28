import type { Metadata, NextPage } from "next"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import Projects from "@/modules/projects/components/Projects"

export const metadata: Metadata = {
  title: "Projects - Prem Gautam",
}

const ProjectsPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading
        title="Projects"
        subtitle="Showcasing my passion for technology, design, and problem-solving through code"
      />
      <Projects />
    </Container>
  )
}

export default ProjectsPage
