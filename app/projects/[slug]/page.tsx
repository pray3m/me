import BackButton from "@/common/components/elements/BackButton";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { PROJECTS } from "@/data/projects";
import ProjectDetail from "@/modules/projects/components/ProjectDetail";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

const ProjectsDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Container>
        <PageHeading
          title="Project Not Found"
          subtitle="Please check the URL."
        />
      </Container>
    );
  }

  return (
    <>
      <Container data-aos="fade-up">
        <BackButton url="/projects" />
        <PageHeading
          title="Projects Details"
          subtitle="Showcasing my passion for technology, design, and problem-solving through code."
        />

        <ProjectDetail {...project} />
      </Container>
    </>
  );
};

export default ProjectsDetailPage;
