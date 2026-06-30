import { env } from "@/lib/env"
import { resilientFetch } from "@/lib/http"

const OPENAI_API_KEY = env.OPENAI_API_KEY
const OPENAI_URL = "https://api.openai.com/v1/chat/completions"
const PUBLIC_PORTFOLIO_CONTEXT = `
Public portfolio facts:
- Prem Gautam, aka pray3m, is a full-stack engineer from Butwal, Nepal.
- Prem builds production web products end to end: frontend, backend, AI-assisted browser-extension work, AI features, deployment, and infrastructure.
- Public projects: Pikeah, Maison & Architecture, CRO Scan, Netra Guardian, ZyFlow, aaza, premgautam.me, freelanceX, and Nepathya DeFi.
- Public stack: TypeScript, React, Next.js, Node.js, NestJS, PostgreSQL, Prisma, Docker, Tailwind CSS, SwiftUI, Python, FastAPI, and AI integrations.
- Public positioning: full-cycle engineer who turns rough ideas into shipped production systems.
`.trim()

const SAFE_FALLBACK_REPLY =
  "I can only answer from Prem's public portfolio information. For private company details or anything not shown on the site, please contact Prem directly."

const PRIVATE_OR_UNSUPPORTED_PATTERNS = [
  /\b(api[_ -]?key|secret|token|password|credential|cookie|session)\b/i,
  /\b(private repo|internal repo|source code access|database dump)\b/i,
  /\b(client data|user data|lead list|personal data)\b/i,
  /\b(network capture|voyager|li_at|jsessionid|csrf)\b/i,
  /\b(exact revenue|salary|contract|invoice|rate)\b/i,
]

const PORTFOLIO_ASSISTANT_PROMPT = `
You are the AI assistant on Prem Gautam's public portfolio.

Answer briefly, clearly, and professionally. Use only these public-safe facts:
${PUBLIC_PORTFOLIO_CONTEXT}

If the user asks for private company details, secrets, credentials, internal repos, or anything not public on the site, say you can only discuss public portfolio information.
If you do not know the answer, say so and suggest contacting Prem.
Do not roleplay as a pirate or use gimmicky voice.
`.trim()

const hasUnsafePortfolioContent = (text: string) =>
  PRIVATE_OR_UNSUPPORTED_PATTERNS.some((pattern) => pattern.test(text))

const safeChatResponse = (content: string) => ({
  choices: [{ message: { content } }],
})

export const postChatPrompt = async (prompt: string) => {
  try {
    if (hasUnsafePortfolioContent(prompt)) {
      return { status: 200, data: safeChatResponse(SAFE_FALLBACK_REPLY) }
    }

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

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content

    if (typeof reply !== "string" || hasUnsafePortfolioContent(reply)) {
      return { status, data: safeChatResponse(SAFE_FALLBACK_REPLY) }
    }

    return { status, data }
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
