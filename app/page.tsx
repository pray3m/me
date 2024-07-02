import Container from "@/common/components/elements/Container";
import Home from "@/modules/home/components/Home";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <Container>
      <Home />
    </Container>
  );
};

export default HomePage;
