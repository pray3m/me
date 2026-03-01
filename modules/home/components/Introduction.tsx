import { type FC } from "react"

const Introduction: FC = () => {
  const currentYear = new Date().getFullYear()
  const workStart = 2024
  const codingStart = 2022

  return (
    <section className="space-y-5 bg-cover bg-no-repeat">
      <div className="flex gap-2 font-semibold text-2xl lg:text-3xl">
        <h1>Hi, I&apos;m Prem</h1>{" "}
        <div className="ml-1 inline-block origin-[70%_70%] animate-waving-hand">
          👋
        </div>
      </div>

      <div className="space-y-3">
        <ul className="ml-5 flex list-disc flex-col gap-1 text-muted-foreground lg:flex-row lg:gap-8">
          <li>life-long learner</li>
          <li>
            Based in Butwal , Nepal <span className="ml-1">🇳🇵</span>
          </li>
        </ul>
        <p className="text-foreground leading-8">
          I&apos;m a full-stack developer with {currentYear - workStart} year
          experience and {currentYear - codingStart} year in web development. I
          specialize in building responsive interfaces with React.js and
          Next.js, and developing robust backends using Node.js, NestJS,
          MongoDB, and MySQL via Prisma ORM. Currently expanding my DevOps
          skills to create scalable and reliable applications. Committed to
          continuous learning and growth.
        </p>
      </div>
    </section>
  )
}

export default Introduction
