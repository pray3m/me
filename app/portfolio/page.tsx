import Container from "@/common/components/elements/Container";
import Portfolio from "@/modules/portfolio/components/Portfolio";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Prem Gautam",
};

const PortfolioPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <Portfolio />
    </Container>
  );
};

export default PortfolioPage;
