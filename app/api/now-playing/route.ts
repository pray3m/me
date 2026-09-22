import { NextResponse } from "next/server"

import { logger } from "@/lib/logger"
import { getNowPlaying } from "@/services/spotify"

const CACHE_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
}

const ERROR_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
}

export async function GET() {
  try {
    const { data } = await getNowPlaying()

    if (!data) {
      return NextResponse.json(
        { isPlaying: false },
        { status: 200, headers: CACHE_HEADERS }
      )
    }

    return NextResponse.json(data, { status: 200, headers: CACHE_HEADERS })
  } catch (error) {
    logger.error("now-playing route failed", {
      error: error instanceof Error ? error.message : String(error),
    })

    return NextResponse.json(
      { isPlaying: false, error: "Spotify request failed." },
      { status: 502, headers: ERROR_HEADERS }
    )
  }
}
