import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Portfolio from "@/modules/portfolio/components/Portfolio";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Prem Gautam",
};

const PortfolioPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading
        title="Portfolio"
        subtitle="Exploring my passion for technology, design, and problem-solving through code"
      />
      <Portfolio />
    </Container>
  );
};

export default PortfolioPage;
