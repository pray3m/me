/**
 * Tiny structured logger — emits one JSON line per event so logs are
 * machine-parseable (Vercel log drains, grep, dashboards) instead of free-text.
 * Server-side use; keep it dependency-free and cheap.
 */

type LogLevel = "debug" | "info" | "warn" | "error"

function write(
  level: LogLevel,
  message: string,
  fields?: Record<string, unknown>
) {
  const entry = JSON.stringify({
    level,
    message,
    time: new Date().toISOString(),
    ...fields,
  })
  if (level === "error") console.error(entry)
  else if (level === "warn") console.warn(entry)
  else console.log(entry)
}

export const logger = {
  debug: (message: string, fields?: Record<string, unknown>) =>
    write("debug", message, fields),
  info: (message: string, fields?: Record<string, unknown>) =>
    write("info", message, fields),
  warn: (message: string, fields?: Record<string, unknown>) =>
    write("warn", message, fields),
  error: (message: string, fields?: Record<string, unknown>) =>
    write("error", message, fields),
}
