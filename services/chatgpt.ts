import { env } from "@/lib/env"
import { resilientFetch } from "@/lib/http"

const OPENAI_API_KEY = env.OPENAI_API_KEY
const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

export const postChatPrompt = async (prompt: string) => {
  try {
    const response = await resilientFetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        messages: [
          {
            role: "system",
            content:
              "Talk like a pirate. Talk very briefly.  Role: You are a AI assistant for Prem Gautam (aka pray3m) (https://premgautam.me).",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })

    const status = response.status

    if (status >= 400) {
      return { status, message: response.statusText }
    }

    return { status, data: await response.json() }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An error occurred"
    console.error("Error posting chat prompt:", message)
    return { status: 500, message }
  }
}

export const sendMessage = async (prompt: string) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })
    const data = await response.json()
    return data.reply ?? ""
  } catch {
    return ""
  }
}
