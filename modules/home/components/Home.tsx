import type { FC } from "react"
import Breakline from "@/components/ds/breakline"
import ExperienceSection from "./ExperienceSection"
import Introduction from "./Introduction"
import ProjectsSection from "./ProjectsSection"
import Services from "./Services"
import SkillsSection from "./SkillsSection"

const Home: FC = () => {
  return (
    <>
      <Introduction />

      <Breakline className="mt-8 mb-6 lg:mt-10 lg:mb-8" />
      <ExperienceSection />

      <Breakline className="my-8 lg:my-10" />
      <ProjectsSection />

      <Breakline className="my-8 lg:my-10" />
      <SkillsSection />

      <Breakline className="my-8 lg:my-10" />
      <Services />
    </>
  )
}

export default Home
