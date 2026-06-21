import { z } from "zod"

/**
 * Typed environment gateway — parse-don't-validate at the boundary.
 *
 * Every `process.env` read in the app should flow through `env` so we get
 * autocomplete + a single fail-fast point instead of cryptic runtime errors
 * deep inside a service. Secrets live in `serverSchema`; anything safe to ship
 * to the browser lives in `clientSchema` (must be prefixed `NEXT_PUBLIC_`).
 *
 * Note: this module is imported from code that ends up in the client bundle
 * (services/chatgpt.ts → CommandPalette), so we only validate server secrets
 * when actually running on the server — on the client they are `undefined` by
 * design and never read.
 */

const serverSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1),
  WAKATIME_API_KEY: z.string().min(1),
  GITHUB_READ_USER_TOKEN: z.string().min(1),
  SITE_URL: z.url().default("https://premgautam.me"),
})

const clientSchema = z.object({
  NEXT_PUBLIC_API: z.url(),
})

/**
 * Reference each var explicitly: Next.js only inlines literal
 * `process.env.NEXT_PUBLIC_*` accesses into the client bundle, so spreading
 * `process.env` would leave client vars `undefined` in the browser.
 */
const runtimeEnv = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
  WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
  GITHUB_READ_USER_TOKEN: process.env.GITHUB_READ_USER_TOKEN,
  SITE_URL: process.env.SITE_URL,
  NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
}

const isServer = typeof window === "undefined"

const schema = isServer
  ? z.object({ ...serverSchema.shape, ...clientSchema.shape })
  : clientSchema

const parsed = schema.safeParse(runtimeEnv)

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    z.flattenError(parsed.error).fieldErrors
  )
  throw new Error(
    "Invalid environment variables — check the keys above against .env.example."
  )
}

/**
 * On the client only `clientSchema` is validated, but the type is the full
 * shape so server code keeps autocomplete; server-only keys are simply never
 * read in the browser.
 */
export const env = parsed.data as z.infer<typeof serverSchema> &
  z.infer<typeof clientSchema>
