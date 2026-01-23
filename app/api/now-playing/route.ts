import { NextRequest, NextResponse } from "next/server"

import { getNowPlaying } from "@/services/spotify"

const CACHE_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
}

export async function GET(_req: NextRequest) {
  const response = await getNowPlaying()

  const status = response?.status ?? 200

  if (status === 204 || !response?.data) {
    return NextResponse.json(
      { isPlaying: false },
      { status: 200, headers: CACHE_HEADERS }
    )
  }

  if (status >= 400) {
    return NextResponse.json(
      { error: "Failed to fetch data from Spotify." },
      { status, headers: CACHE_HEADERS }
    )
  }

  return NextResponse.json(response.data, {
    headers: CACHE_HEADERS,
    status,
  })
}
