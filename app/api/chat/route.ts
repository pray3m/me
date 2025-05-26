import axios from "axios"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()
  const endpoint = "https://api.openai.com/v1/chat/completions"
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  }

  const payload = {
    model: "gpt-4.1-nano",
    messages: [
      {
        role: "developer",
        content: "Talk like a pirate.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  }

  try {
    const response = await axios.post(endpoint, payload, header)

    const reply = response?.data?.choices[0].message.content

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    const status = error.response?.status || 500
    const message = error.response?.data || error.message
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  }
}
