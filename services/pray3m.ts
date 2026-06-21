import { env } from "@/lib/env"

const API_URL = env.NEXT_PUBLIC_API

export const getApiData = async (query: string) => {
  const response = await fetch(`${API_URL}/fetch?query=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const status: number = response.status
  const responseJson = await response.json()

  if (status > 400) {
    return { status, data: {} }
  }

  return { status, data: responseJson.data }
}
