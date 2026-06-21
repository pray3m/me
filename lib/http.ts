import { logger } from "@/lib/logger"

/**
 * `fetch` with a per-attempt timeout + retry on transient failures
 * (timeouts, network errors, 429/5xx) using full-jitter exponential backoff.
 * Server-side only — wrap upstream calls in `services/*` so one slow/flaky
 * dependency can't hang the whole function until its max duration.
 */

export interface ResilientFetchOptions extends RequestInit {
  timeoutMs?: number
  retries?: number
  baseDelayMs?: number
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Full-jitter backoff: a random point in [base·2^n / 2, base·2^n] — spreads
// retries so a recovering upstream isn't hammered in lockstep (thundering herd).
const backoff = (attempt: number, base: number) =>
  Math.round(2 ** attempt * base * (0.5 + Math.random() * 0.5))

const isRetryableStatus = (status: number) => status === 429 || status >= 500

const reason = (error: unknown) =>
  error instanceof Error && error.name === "AbortError" ? "timeout" : "network"

// One attempt with its own abort timer.
async function attemptOnce(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function waitBeforeRetry(
  url: string,
  attempt: number,
  base: number,
  meta: Record<string, unknown>
) {
  const delay = backoff(attempt, base)
  logger.warn("upstream call failed; retrying", {
    url,
    attempt,
    delay,
    ...meta,
  })
  await sleep(delay)
}

export async function resilientFetch(
  url: string,
  {
    timeoutMs = 8000,
    retries = 2,
    baseDelayMs = 300,
    ...init
  }: ResilientFetchOptions = {}
): Promise<Response> {
  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await attemptOnce(url, init, timeoutMs)
      if (!isRetryableStatus(response.status) || attempt === retries) {
        return response
      }
      await waitBeforeRetry(url, attempt, baseDelayMs, {
        status: response.status,
      })
    } catch (error) {
      lastError = error
      if (attempt === retries) break
      await waitBeforeRetry(url, attempt, baseDelayMs, {
        reason: reason(error),
      })
    }
  }

  logger.error("upstream call failed; giving up", {
    url,
    attempts: retries + 1,
  })
  throw lastError
}
