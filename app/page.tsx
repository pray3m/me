import type { NextPage } from "next"
import Container from "@/common/components/elements/Container"
import Home from "@/modules/home/components/Home"

const HomePage: NextPage = () => {
  return (
    <Container data-aos="fade-up">
      <Home />
    </Container>
  )
}

export default HomePage
