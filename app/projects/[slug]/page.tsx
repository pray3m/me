import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BackButton from "@/components/ds/back-button"
import Container from "@/components/ds/container"
import PageHeading from "@/components/ds/page-heading"
import Reveal from "@/components/ds/reveal"
import { PROJECTS } from "@/data/projects"
import { breadcrumbSchema, createMetadata, JsonLd } from "@/lib/seo"
import ProjectDetail from "@/modules/projects/components/ProjectDetail"

const visibleProjects = PROJECTS.filter((project) => project.is_visible)

// Only the slugs from generateStaticParams are valid; any other slug 404s
// with a proper status instead of soft-rendering a "not found" 200 page.
export const dynamicParams = false

export async function generateStaticParams() {
  return visibleProjects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = visibleProjects.find((p) => p.slug === slug)

  if (!project) {
    return createMetadata({ title: "Project Not Found", noIndex: true })
  }

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    type: "article",
  })
}

const ProjectsDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const project = visibleProjects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <Container>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${slug}` },
        ])}
      />
      <Reveal>
        <BackButton url="/projects" />
        <PageHeading title={project.title} subtitle={project.description} />

        <ProjectDetail {...project} />
      </Reveal>
    </Container>
  )
}

export default ProjectsDetailPage
