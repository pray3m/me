import "server-only"
import {
  getALLTimeSinceToday,
  getReadStats,
  type ReadStatsData,
} from "@/services/wakatime"

export type CodingStats = ReadStatsData & {
  all_time_since_today: { text?: string } | Record<string, never>
}

/**
 * WakaTime's last-30-days stats, or `null` when the API is unreachable or
 * answers with an error. Callers render a fallback rather than failing.
 */
export const getReadStatsData = async (): Promise<ReadStatsData | null> => {
  try {
    const readStats = await getReadStats()
    if (readStats.status >= 400 || !("last_update" in readStats.data)) {
      return null
    }
    return readStats.data as ReadStatsData
  } catch {
    return null
  }
}

/** The above plus the all-time total — only the full dashboard needs both. */
export const getCodingStats = async (): Promise<CodingStats | null> => {
  try {
    const [readStats, allTime] = await Promise.all([
      getReadStatsData(),
      getALLTimeSinceToday(),
    ])
    if (!readStats) return null
    return { ...readStats, all_time_since_today: allTime.data }
  } catch {
    return null
  }
}
