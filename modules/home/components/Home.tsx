import type { FC } from "react"
import Breakline from "@/components/ds/breakline"
import FeaturedProjects from "./FeaturedProjects"
import Introduction from "./Introduction"
import Services from "./Services"
import SkillsSection from "./SkillsSection"

const Home: FC = () => {
  return (
    <>
      <Introduction />

      <Breakline className="mt-8 mb-6 lg:mt-10 lg:mb-8" />
      <FeaturedProjects />

      <Breakline className="my-8 lg:my-10" />
      <SkillsSection />

      <Breakline className="my-8 lg:my-10" />
      <Services />
    </>
  )
}

export default Home
