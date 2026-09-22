#!/usr/bin/env bun
/**
 * Mints a fresh SPOTIFY_REFRESH_TOKEN.
 *
 * Spotify refresh tokens die six months after the user authorizes, and
 * refreshing does not extend that — so this is a recurring chore, not a
 * one-off. Run it when /api/now-playing starts answering 502 with
 * `invalid_grant` in the logs:
 *
 *   bun run spotify:token             # print the new token
 *   bun run spotify:token --write     # also rewrite SPOTIFY_REFRESH_TOKEN in .env.local
 *   bun run spotify:token --no-open   # don't launch a browser (e.g. over SSH)
 *
 * One-time setup: add the redirect URI below to the app's "Redirect URIs" in
 * the Spotify Developer Dashboard. It must be the literal loopback IP —
 * Spotify rejects `localhost`.
 *
 * Credentials come from .env.local, which bun loads automatically.
 */

import { spawn } from "node:child_process"
import { randomBytes } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { createServer } from "node:http"

const PORT = Number(process.env.SPOTIFY_AUTH_PORT ?? 8888)
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`

// Least privilege: only what services/spotify.ts actually calls. Add
// `user-top-read` here if getTopTracks is ever wired up.
const SCOPES = process.env.SPOTIFY_SCOPES ?? "user-read-currently-playing"

const TIMEOUT_MS = 5 * 60 * 1000

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

const page = (title, detail) =>
  `<!doctype html><meta charset="utf-8"><title>${title}</title>` +
  `<body style="font:16px system-ui;padding:3rem;max-width:34rem">` +
  `<h1 style="font-size:1.25rem">${title}</h1><p>${detail}</p></body>`

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

function authorizeUrl(state) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    state,
  })
  return `https://accounts.spotify.com/authorize?${params}`
}

/** Resolve the ?code Spotify hands back, or reject with why it didn't. */
function waitForCode(state) {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, REDIRECT_URI)
      if (url.pathname !== "/callback") {
        res.writeHead(404).end()
        return
      }

      const settle = (status, title, detail, outcome) => {
        res.writeHead(status, { "Content-Type": "text/html" })
        res.end(page(title, detail))
        server.close()
        outcome()
      }

      const error = url.searchParams.get("error")
      const code = url.searchParams.get("code")

      if (error) {
        settle(400, "Authorization failed", error, () =>
          reject(new Error(`Spotify returned "${error}"`))
        )
      } else if (url.searchParams.get("state") !== state) {
        settle(400, "State mismatch", "Rejected — try again.", () =>
          reject(new Error("state mismatch (possible CSRF); nothing was saved"))
        )
      } else {
        settle(200, "Done", "Token issued. Back to the terminal.", () =>
          resolve(code)
        )
      }
    })

    server.on("error", reject)
    server.listen(PORT, "127.0.0.1")

    setTimeout(() => {
      server.close()
      reject(new Error(`no callback within ${TIMEOUT_MS / 60000} minutes`))
    }, TIMEOUT_MS).unref()
  })
}

async function exchange(code) {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  )
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  const body = await response.json()
  if (!response.ok || !body.refresh_token) {
    fail(
      `token exchange failed (${response.status}): ` +
        `${body.error ?? "unknown"} — ${body.error_description ?? ""}`
    )
  }
  return body.refresh_token
}

// Next's load order, most specific first. This repo keeps secrets in
// .env.local; hardcoding ".env" would quietly create a second, shadowed file.
const ENV_FILES = [
  ".env.local",
  ".env.development.local",
  ".env",
  ".env.development",
]

const read = (file) => readFile(file, "utf8").catch(() => null)

const KEY = /^SPOTIFY_REFRESH_TOKEN=.*$/m

/** The env file that already defines the key, else Next's local default. */
async function envTarget() {
  for (const file of ENV_FILES) {
    const contents = await read(file)
    if (contents && KEY.test(contents)) return file
  }
  return ".env.local"
}

/** Swap in the new token, leaving every other line untouched. */
async function writeEnv(token) {
  const file = await envTarget()
  const contents = (await read(file)) ?? ""
  const line = `SPOTIFY_REFRESH_TOKEN=${token}`
  const next = KEY.test(contents)
    ? contents.replace(KEY, line)
    : `${contents.replace(/\n*$/, "\n")}${line}\n`
  await writeFile(file, next)
  console.log(`✔ ${file} updated`)
}

if (!(CLIENT_ID && CLIENT_SECRET)) {
  fail("SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET missing from .env.local")
}

const state = randomBytes(16).toString("hex")
const url = authorizeUrl(state)

console.log(`\nRedirect URI (must be registered in the dashboard):`)
console.log(`  ${REDIRECT_URI}`)
console.log(`\nScopes: ${SCOPES}`)
console.log(
  `\nOpening the consent screen. If nothing opens, visit:\n  ${url}\n`
)

if (process.platform === "darwin" && !process.argv.includes("--no-open")) {
  spawn("open", [url], { stdio: "ignore", detached: true }).unref()
}

const refreshToken = await waitForCode(state).catch((error) =>
  fail(error.message)
)
const token = await exchange(refreshToken)

const expires = new Date()
expires.setMonth(expires.getMonth() + 6)

console.log(`\nSPOTIFY_REFRESH_TOKEN=${token}\n`)
console.log(`Expires around ${expires.toISOString().slice(0, 10)} — Spotify`)
console.log(`refresh tokens last 6 months and refreshing doesn't extend it.\n`)
console.log(`Set it on Vercel too, then redeploy:`)
console.log(`  vercel env rm SPOTIFY_REFRESH_TOKEN production`)
console.log(`  vercel env add SPOTIFY_REFRESH_TOKEN production\n`)

if (process.argv.includes("--write")) {
  await writeEnv(token)
}
