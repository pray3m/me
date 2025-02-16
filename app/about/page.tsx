import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import About from "@/modules/about/components/About";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "About - Prem Gautam",
};

const AboutPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading title="About" subtitle="Get to know me better." />
      <About />
    </Container>
  );
};

export default AboutPage;
