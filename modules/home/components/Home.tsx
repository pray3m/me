import type { FC } from "react"
import Breakline from "@/components/ds/breakline"
import Hero from "./Hero"
import Introduction from "./Introduction"
import Services from "./Services"
import SkillsSection from "./SkillsSection"
import WhoAmI from "./WhoAmI"

const Home: FC = () => {
  return (
    <>
      <div className="lg:hidden">
        <Hero />
      </div>
      <div className="hidden lg:block">
        <Introduction />
      </div>
      <Breakline className="mt-8 mb-6" />
      <SkillsSection />

      <div className="mt-8 lg:hidden">
        <WhoAmI />
      </div>

      <Breakline className="my-8" />
      <Services />
    </>
  )
}

export default Home
