/**
 * Tiny date helpers backed by the native `Intl` API — a zero-dependency
 * replacement for `moment` (which is ~non-tree-shakeable and ships in full).
 * Covers exactly the formatting/duration/relative-time used across the app.
 */

type DateInput = Date | string | number | null | undefined

function toDate(input?: DateInput): Date {
  // null/undefined → "now" (e.g. an ongoing role with no end date)
  return input == null ? new Date() : new Date(input)
}

function isValidDate(d: Date): boolean {
  return !Number.isNaN(d.getTime())
}

// "21 Jun 2026" (was moment "DD MMM YYYY")
const shortDateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

// "June 21, 2026" (was moment "MMMM DD, YYYY")
const longDateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "2-digit",
  year: "numeric",
})

// "Jun 2026" (was moment "MMM YYYY")
const monthYearFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
})

export function formatShortDate(input?: DateInput): string {
  const d = toDate(input)
  return isValidDate(d) ? shortDateFmt.format(d) : ""
}

export function formatLongDate(input?: DateInput): string {
  const d = toDate(input)
  return isValidDate(d) ? longDateFmt.format(d) : ""
}

export function formatMonthYear(input?: DateInput): string {
  const d = toDate(input)
  return isValidDate(d) ? monthYearFmt.format(d) : ""
}

/** A `Date` for `n` days ago (was moment `.subtract(n, "days")`). */
export function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000)
}

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
const DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: "seconds" },
  { amount: 60, unit: "minutes" },
  { amount: 24, unit: "hours" },
  { amount: 7, unit: "days" },
  { amount: 4.34524, unit: "weeks" },
  { amount: 12, unit: "months" },
  { amount: Number.POSITIVE_INFINITY, unit: "years" },
]

/** "2 hours ago" / "in 3 days" (was moment `.fromNow()`). */
export function relativeTimeFromNow(input?: DateInput): string {
  const d = toDate(input)
  if (!isValidDate(d)) return ""
  let duration = (d.getTime() - Date.now()) / 1000
  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit)
    }
    duration /= division.amount
  }
  return ""
}

/**
 * Whole-year/month duration between two dates, formatted like the career
 * cards: prefers years when ≥1, else months (was moment `.diff(start, "years"
 * | "months")`). `end` defaults to now (an ongoing role).
 */
export function formatDuration(start: DateInput, end?: DateInput): string {
  const s = toDate(start)
  const e = toDate(end)
  if (!isValidDate(s) || !isValidDate(e)) return ""

  let months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
  if (e.getDate() < s.getDate()) months -= 1
  months = Math.max(0, months)

  const years = Math.floor(months / 12)
  if (years > 0) return `${years} year${years > 1 ? "s" : ""}`
  return `${months} month${months > 1 ? "s" : ""}`
}

/**
 * Compact tenure for the experience timeline: "1 yr 8 mos", "4 mos", "2 yrs".
 * Unlike `formatDuration` this keeps the remaining months once a year is
 * reached, and counts inclusively — a Feb→Dec role reads as 11 mos, not 10 —
 * which is the convention LinkedIn and every CV use. `end` defaults to now.
 */
export function formatExactDuration(start: DateInput, end?: DateInput): string {
  const s = toDate(start)
  const e = toDate(end)
  if (!isValidDate(s) || !isValidDate(e)) return ""

  const months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) + 1 // both the start and end month count
  if (months < 1) return ""

  const years = Math.floor(months / 12)
  const restMonths = months % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`)
  if (restMonths > 0) parts.push(`${restMonths} mo${restMonths > 1 ? "s" : ""}`)
  return parts.join(" ")
}

export function timeOfDayGreeting(date: Date): string {
  const hour = date.getHours()
  if (hour >= 5 && hour < 12) return "Good morning"
  if (hour >= 12 && hour < 17) return "Good afternoon"
  return "Good evening"
}

const nepalTimeFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kathmandu",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
})

export function formatNepalTime(input?: DateInput): string {
  const d = toDate(input)
  return isValidDate(d) ? nepalTimeFmt.format(d) : ""
}
