import { getGithubUser } from "@/services/github"
import { NextResponse } from "next/server"

const CACHE_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
}

export async function GET() {
  const userID = "pray3m"
  const { status, data } = await getGithubUser(userID)

  if (status > 400) {
    return NextResponse.json(
      { error: "Failed to fetch data from GitHub." },
      { status: 500, headers: CACHE_HEADERS }
    )
  }

  return NextResponse.json(data, { status: 200 })
}
