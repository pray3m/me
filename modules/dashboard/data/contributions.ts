import "server-only"
import { getGithubUser } from "@/services/github"

const GITHUB_USERNAME = "pray3m"

export interface ContributionDay {
  date: string
  contributionCount: number
  color: string
}

export interface ContributionMonth {
  name: string
  firstDay: string
  totalWeeks: number
}

export interface ContributionCalendar {
  colors: string[]
  totalContributions: number
  months: ContributionMonth[]
  weeks: {
    firstDay: string
    contributionDays: ContributionDay[]
  }[]
}

/**
 * Last year's contribution calendar, or `null` when GitHub is unreachable or
 * answers with an error. Callers render a fallback — a flaky upstream must
 * never take a page down with it.
 */
export const getContributionCalendar =
  async (): Promise<ContributionCalendar | null> => {
    try {
      const { status, data } = await getGithubUser(GITHUB_USERNAME)
      if (status >= 400 || data?.error) return null
      return data?.contributionsCollection?.contributionCalendar ?? null
    } catch {
      return null
    }
  }

/** Contributions in the most recent (partial) week of the calendar. */
export const countThisWeek = (calendar: ContributionCalendar): number =>
  calendar.weeks
    .at(-1)
    ?.contributionDays.reduce(
      (total, day) => total + day.contributionCount,
      0
    ) ?? 0
