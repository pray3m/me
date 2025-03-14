import moment from "moment"
import type { FC } from "react"
import OverviewItem from "./OverviewItem"

interface OverviewProps {
  data: {
    human_readable_total?: string
    human_readable_daily_average?: string
    best_day?: {
      text?: string
      date?: string
    }
    all_time_since_today?: {
      text?: string
    }
    start_date?: string
    end_date?: string
    range?: string
  }
}

const Overview: FC<OverviewProps> = ({ data }) => {
  const dailyTotal = data?.human_readable_total ?? "N/A"
  const dailyAverage = data?.human_readable_daily_average ?? "N/A"
  const bestDay = data?.best_day?.text ?? "N/A"
  const allTimeSinceToday = data?.all_time_since_today?.text ?? "N/A"

  const startDate = data?.start_date
    ? moment(data.start_date).format("MMMM DD, YYYY")
    : data?.range === "last_7_days"
      ? moment().subtract(7, "days").format("MMMM DD, YYYY")
      : "N/A"

  const endDate = data?.end_date
    ? moment(data.end_date).format("MMMM DD, YYYY")
    : data?.range === "last_7_days"
      ? moment().format("MMMM DD, YYYY")
      : "N/A"

  const bestDayTime = data?.best_day?.date
    ? ` ${moment(data.best_day.date).format("MMMM DD, YYYY")} ~ ${bestDay}`
    : "N/A"

  return (
    <div className="mb-1 grid gap-3 py-2 md:grid-cols-2">
      <OverviewItem label="Start Date" value={startDate} />
      <OverviewItem label="End Date" value={endDate} />
      <OverviewItem label="Daily Coding Average" value={dailyAverage} />
      <OverviewItem label="This Month Coding Time" value={dailyTotal} />
      <OverviewItem label="Best Day Coding Time" value={bestDayTime} />
      <OverviewItem label="All Time Since Today" value={allTimeSinceToday} />
    </div>
  )
}

export default Overview
