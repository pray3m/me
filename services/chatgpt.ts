import { env } from "@/lib/env"
import { resilientFetch } from "@/lib/http"

const OPENAI_API_KEY = env.OPENAI_API_KEY
const OPENAI_URL = "https://api.openai.com/v1/chat/completions"
const PORTFOLIO_ASSISTANT_PROMPT = `
You are the AI assistant on Prem Gautam's public portfolio.

Answer briefly, clearly, and professionally. Use only public-safe facts:
- Prem Gautam, aka pray3m, is a full-stack engineer from Butwal, Nepal.
- He builds production web products end to end: frontend, backend, browser extensions, AI features, deployment, and infrastructure.
- Current focus: Hyteno, Pikeah, Maison & Architecture, CRO Scan, aaza, ZyFlow, Netra Guardian, and this portfolio.
- Core stack: TypeScript, React, Next.js, Node.js, NestJS, PostgreSQL, Prisma, Docker, Tailwind CSS, SwiftUI, Python, and AI integrations.
- Strong positioning: full-cycle engineer who can turn rough ideas into shipped production systems.

If the user asks for private company details, secrets, credentials, internal repos, or anything not public on the site, say you can only discuss public portfolio information.
If you do not know the answer, say so and suggest contacting Prem.
Do not roleplay as a pirate or use gimmicky voice.
`.trim()

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
            content: PORTFOLIO_ASSISTANT_PROMPT,
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
