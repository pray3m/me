import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

import { getNowPlaying, getTopTracks } from "@/services/spotify"

const CACHE_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
}

export async function GET(req: NextRequest) {
  const response = await getNowPlaying()

  if (response.status && response.status > 400) {
    return NextResponse.json(
      { error: "Failed to fetch data from Spotify." },
      { status: response.status, headers: CACHE_HEADERS }
    )
  }

  return NextResponse.json(response.data, {
    headers: CACHE_HEADERS,
    status: response.status,
  })
}
