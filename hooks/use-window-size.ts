import { useEffect, useState } from "react"

const useWindowSize = (): number => {
  const [windowSize, setWindowSize] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth)
    }

    if (typeof window !== "undefined") {
      handleResize()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
