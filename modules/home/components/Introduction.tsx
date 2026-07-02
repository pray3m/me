import { Briefcase, MapPin } from "lucide-react"
import { type FC } from "react"
import Greeting from "@/components/blocks/Greeting"
import Status from "@/components/blocks/Status"

const Introduction: FC = () => {
  const currentYear = new Date().getFullYear()
  const professionalYears = currentYear - 2024

  return (
    <section className="space-y-4 bg-cover bg-no-repeat lg:space-y-5">
      {/* Eyebrow role, then the greeting h1 — role scans first, name second. */}
      <div className="space-y-1.5">
        <p className="font-medium text-brand text-xs uppercase tracking-[0.18em]">
          Full-Stack Engineer
        </p>
        <Greeting />
      </div>

      {/* Meta strip: scannable identity line. Each item's leading icon acts as
          its own divider, so it stays tidy when it wraps on small screens. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground text-sm">
        <span className="inline-flex items-center gap-1.5">
          <MapPin aria-hidden="true" className="size-4" />
          Butwal, Nepal
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Briefcase aria-hidden="true" className="size-4" />
          {professionalYears}.5+ yrs experience
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Open to collabs
        </span>
      </div>

      {/* Current-work chip — desktop shows this in the sidebar, so mobile only. */}
      <div className="lg:hidden">
        <Status />
      </div>

      <p className="max-w-2xl text-pretty text-foreground leading-8">
        I craft responsive interfaces in React &amp; Next.js, robust backends
        with Node.js, NestJS, and PostgreSQL, and own the deployment and infra
        behind them — Docker, self-managed servers, and AI where it genuinely
        helps. Always learning, always shipping.
      </p>
    </section>
  )
}

export default Introduction
