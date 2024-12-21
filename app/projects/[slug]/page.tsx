import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  return {
    title: `Projects Details - ${slug}`,
    description: `Details about project: ${slug}. Showcasing my passion for technology, design, and problem-solving through code.`,
  };
}

const ProjectsDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <>
      <Container data-aos="fade-up">
        <PageHeading
          title="Projects Details"
          subtitle="Showcasing my passion for technology, design, and problem-solving through code."
        />

        <div>Details of the project: {slug}</div>
      </Container>
    </>
  );
};

export default ProjectsDetailPage;
