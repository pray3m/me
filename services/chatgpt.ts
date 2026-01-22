import axios from "axios"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_URL = "https://api.openai.com/v1/chat/completions"

export const postChatPrompt = async (prompt: string) => {
  try {
    const response = await axios.post(
      OPENAI_URL,
      {
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
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    )

    const status = response?.status

    if (status >= 400) {
      return {
        status,
        message: response?.statusText,
      }
    }

    return {
      status,
      data: response?.data,
    }
  } catch (error: unknown) {
    const e = error as {
      response?: { status?: number; data?: unknown }
      message?: string
    }
    console.error(
      "Error posting chat prompt:",
      e.response?.data ?? e.message ?? error
    )
    return {
      status: e.response?.status ?? 500,
      message: e.response?.data ?? e.message ?? "An error occurred",
    }
  }
}

export const sendMessage = async (prompt: string) => {
  try {
    const response = await axios.post("/api/chat", {
      prompt,
    })
    return response.data.reply
  } catch {
    return ""
  }
}
