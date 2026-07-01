"use client"

import { type FC, useEffect, useState } from "react"

type GreetingItem = { text: string; lang: string; rtl?: boolean }

const GREETINGS: GreetingItem[] = [
  { text: "Hi", lang: "en" },
  { text: "Hola", lang: "es" },
  { text: "Bonjour", lang: "fr" },
  { text: "नमस्ते", lang: "ne" },
  { text: "Olá", lang: "pt" },
  { text: "Hallo", lang: "de" },
  { text: "你好", lang: "zh" },
]

const Greeting: FC = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  const greeting = GREETINGS[index]

  // Name group is block on mobile so long greetings (Bonjour, नमस्ते) drop it to
  // their own line as one unit; inline on desktop where the whole line fits.
  return (
    <h1 className="font-semibold text-2xl tracking-normal lg:text-3xl">
      <span
        key={index}
        lang={greeting.lang}
        dir={greeting.rtl ? "rtl" : "ltr"}
        className="fade-in-0 slide-in-from-bottom-1 inline-block animate-in duration-500"
      >
        {greeting.text},
      </span>{" "}
      <span className="block whitespace-nowrap lg:inline">
        I&apos;m Prem Gautam.{" "}
        <span className="inline-block origin-[70%_70%] animate-waving-hand">
          👋
        </span>
      </span>
    </h1>
  )
}

export default Greeting
