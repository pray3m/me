import axios from "axios"

const API_KEY = process.env.WAKATIME_API_KEY

const STATS_ENDPOINT = "https://wakatime.com/api/v1/users/current/stats"
const ALL_TIME_SINCE_TODAY =
  "https://wakatime.com/api/v1/users/current/all_time_since_today"

interface WakatimeLanguage {
  name: string
  total_seconds: number
  percent?: number
  digital?: string
  hours?: number
  minutes?: number
  text?: string
}

interface WakatimeEditor {
  name: string
  total_seconds: number
  percent?: number
  digital?: string
  hours?: number
  minutes?: number
  text?: string
}

interface WakatimeCategory {
  name: string
  total_seconds: number
  percent?: number
  digital?: string
  hours?: number
  minutes?: number
  text?: string
}

interface WakatimeBestDay {
  date: string
  text: string
}

interface ReadStatsData {
  last_update: string
  start_date: string
  end_date: string
  range?: string
  categories: WakatimeCategory[]
  best_day: WakatimeBestDay
  human_readable_daily_average: string
  human_readable_total: string
  languages: WakatimeLanguage[]
  editors: WakatimeEditor[]
}

interface AllTimeData {
  text: string
  total_seconds: number
}

export const getReadStats = async (): Promise<{
  status: number
  data: ReadStatsData | Record<string, never>
}> => {
  const response = await axios.get(`${STATS_ENDPOINT}/last_30_days`, {
    headers: {
      Authorization: `Basic ${API_KEY}`,
    },
  })

  const status = response.status
  if (status >= 400) return { status, data: {} }

  const getData = response.data

  // Extracting data with fallback in case of undefined values
  const start_date = getData?.data?.start || ""
  const end_date = getData?.data?.end || ""
  const last_update = getData?.data?.modified_at || ""

  const categories = getData?.data?.categories || []

  const best_day = {
    date: getData?.data?.best_day?.date || "",
    text: getData?.data?.best_day?.text || "",
  }
  const human_readable_daily_average =
    getData?.data?.human_readable_daily_average_including_other_language || ""
  const human_readable_total =
    getData?.data?.human_readable_total_including_other_language || ""

  const languages = getData?.data?.languages?.slice(0, 3) || []
  const editors = getData?.data?.editors || []

  return {
    status,
    data: {
      last_update,
      start_date,
      end_date,
      categories,
      best_day,
      human_readable_daily_average,
      human_readable_total,
      languages,
      editors,
    },
  }
}

export const getALLTimeSinceToday = async (): Promise<{
  status: number
  data: AllTimeData | Record<string, never>
}> => {
  const response = await axios.get(ALL_TIME_SINCE_TODAY, {
    headers: {
      Authorization: `Basic ${API_KEY}`,
    },
  })

  const status = response.status
  if (status >= 400) return { status, data: {} }

  const getData = response.data

  const data = {
    text: getData?.data?.text || "",
    total_seconds: getData?.data?.total_seconds || 0,
  }

  return {
    status,
    data,
  }
}
