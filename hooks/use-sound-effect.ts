import { useCallback, useRef } from "react"

/**
 * Plays a short UI sound on demand.
 *
 * The Audio element is created on the first call rather than on mount, so a
 * visitor who never triggers it never pays the request — and creating it inside
 * a click handler keeps it on the user gesture browsers require for playback.
 */
const useSoundEffect = (src: string, volume = 0.35) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  return useCallback(() => {
    if (!audioRef.current) audioRef.current = new Audio(src)

    const audio = audioRef.current
    audio.volume = volume
    audio.currentTime = 0

    // Rejects when the tab is muted or autoplay policy blocks it. A silent
    // toggle is the correct fallback, so swallow it.
    audio.play().catch(() => undefined)
  }, [src, volume])
}

export default useSoundEffect
