import { ArrowUpRight } from "lucide-react"
import type { FC } from "react"
import SectionHeading from "@/components/ds/section-heading"
import ExperienceTimeline from "@/modules/about/components/ExperienceTimeline"

const LINKEDIN_URL = "https://www.linkedin.com/in/pray3m/"

const ExperienceSection: FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <SectionHeading title="Experience" />
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-1 font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>
            <span className="hidden sm:inline">View on </span>LinkedIn
          </span>
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <ExperienceTimeline />
    </section>
  )
}

export default ExperienceSection
