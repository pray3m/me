import Container from "@/common/components/elements/Container";
import Portfolio from "@/modules/portfolio/components/Portfolio";
import { NextPage } from "next";

const PortfolioPage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <Portfolio />
    </Container>
  );
};

export default PortfolioPage;
