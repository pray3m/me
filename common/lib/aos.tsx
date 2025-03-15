"use client"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

export const AOSInit = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      delay: 50,
      // offset: 0,
      // once: true,
    })
  }, [])

  return null
}
