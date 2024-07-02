import Container from "@/common/components/elements/Container";
import Portfolio from "@/modules/home/components/portfolio/components/Portfolio";
import { NextPage } from "next";

const PortfolioPage: NextPage = () => {
  return (
    <Container>
      <Portfolio />
    </Container>
  );
};

export default PortfolioPage;
