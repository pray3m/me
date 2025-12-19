import { NextRequest } from "next/server"
import { postChatPrompt } from "@/services/chatgpt"

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  try {
    const response = await postChatPrompt(prompt)

    if ((response?.status ?? 0) >= 400) {
      return new Response(
        JSON.stringify({ error: response?.message ?? "An error occurred" }),
        {
          status: response?.status ?? 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    } else {
      const reply = response?.data?.choices[0]?.message?.content

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
  } catch (error: unknown) {
    const e = error as {
      response?: { status?: number; data?: unknown }
      message?: string
    }
    const status = e.response?.status || 500
    const message = e.response?.data || e.message
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  }
}
