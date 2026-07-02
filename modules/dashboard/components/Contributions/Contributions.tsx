import Link from "next/link"
import { BsGithub } from "react-icons/bs"
import SectionHeading from "@/components/ds/section-heading"
import SectionSubHeading from "@/components/ds/section-sub-heading"
import { getGithubUser } from "@/services/github"
import Calendar from "./Calendar"
import Overview from "./Overview"

const GITHUB_USERNAME = "pray3m"

const Contributions = async () => {
  let contributionCalendar = null
  try {
    const { status, data } = await getGithubUser(GITHUB_USERNAME)
    if (status < 400 && !data?.error) {
      contributionCalendar =
        data?.contributionsCollection?.contributionCalendar ?? null
    }
  } catch {
    contributionCalendar = null
  }

  return (
    <section className="flex flex-col gap-y-2">
      <SectionHeading
        title="Contributions"
        icon={<BsGithub className="mr-1" />}
      />

      <SectionSubHeading>
        <p className="text-muted-foreground">
          My Github Contributions from last year.
        </p>
        <Link
          href={"https://github.com/pray3m"}
          target="_blank"
          rel="noopener noreferrer"
          passHref
          className="font-mono text-muted-foreground text-sm hover:text-foreground"
        >
          @pray3m
        </Link>
      </SectionSubHeading>

      {contributionCalendar ? (
        <div className="space-y-3">
          <Overview data={contributionCalendar} />
          <Calendar data={contributionCalendar} />
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Couldn&apos;t load contributions right now.
        </p>
      )}
    </section>
  )
}

export default Contributions
