import Container from "@/common/components/elements/Container";
import Portfolio from "@/modules/portfolio/components/Portfolio";
import { NextPage } from "next";

const PortfolioPage: NextPage = () => {
  return (
    <Container className="bg-red-800">
      <Portfolio />
    </Container>
  );
};

export default PortfolioPage;
