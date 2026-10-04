import { useEffect, useState } from "react"

const MINUTE_MS = 60_000

const useClock = (): Date | null => {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    let interval: ReturnType<typeof setInterval> | undefined
    const align = setTimeout(
      () => {
        setNow(new Date())
        interval = setInterval(() => setNow(new Date()), MINUTE_MS)
      },
      MINUTE_MS - (Date.now() % MINUTE_MS)
    )

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") setNow(new Date())
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      clearTimeout(align)
      if (interval) clearInterval(interval)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [])

  return now
}

export default useClock
