import { type FC } from "react"
import Greeting from "@/components/blocks/Greeting"

const Introduction: FC = () => {
  const currentYear = new Date().getFullYear()
  const workYears = currentYear - 2024
  const codingYears = currentYear - 2022

  return (
    <section className="space-y-5 bg-cover bg-no-repeat">
      <Greeting />

      <div className="space-y-3">
        <ul className="ml-5 flex list-disc flex-col gap-1 text-muted-foreground lg:flex-row lg:gap-8">
          <li>life-long learner</li>
          <li>
            Based in Butwal , Nepal <span className="ml-1">🇳🇵</span>
          </li>
        </ul>
        <p className="text-foreground leading-8">
          I&apos;m a full-stack engineer with {workYears} year
          {workYears === 1 ? "" : "s"} of professional experience and{" "}
          {codingYears} years in web development. I build responsive interfaces
          with React.js and Next.js, robust backends with Node.js, NestJS, and
          PostgreSQL, and own the deployment and infrastructure behind them with
          Docker and self-managed servers — bringing in AI where it genuinely
          helps. Always learning, always shipping.
        </p>
      </div>
    </section>
  )
}

export default Introduction
