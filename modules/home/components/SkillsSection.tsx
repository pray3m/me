import SectionHeading from "@/components/ds/section-heading"
import Skills from "@/modules/about/components/Skills"

const SkillsSection = () => {
  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <SectionHeading title="Stack" />
      </div>
      <Skills />
    </section>
  )
}

export default SkillsSection
