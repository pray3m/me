import type { FC } from "react"
import Breakline from "@/components/ds/breakline"
import Reveal from "@/components/ds/reveal"
import Introduction from "./Introduction"
import Services from "./Services"
import SkillsSection from "./SkillsSection"

const Home: FC = () => {
  return (
    <>
      {/* Hero/intro renders static and visible on first paint — no entrance. */}
      <Introduction />

      {/* Below-the-fold sections fade up as they scroll into view. */}
      <Breakline className="mt-8 mb-6 lg:mt-10 lg:mb-8" />
      <Reveal>
        <SkillsSection />
      </Reveal>

      <Breakline className="my-8 lg:my-10" />
      <Reveal>
        <Services />
      </Reveal>
    </>
  )
}

export default Home
