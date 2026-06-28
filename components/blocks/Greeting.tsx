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

  return (
    <div className="flex gap-2 font-semibold text-2xl lg:text-3xl">
      <h1>
        <span
          key={index}
          lang={greeting.lang}
          dir={greeting.rtl ? "rtl" : "ltr"}
          className="fade-in-0 slide-in-from-bottom-1 inline-block animate-in duration-500"
        >
          {greeting.text}
        </span>
        , I&apos;m Prem
      </h1>
      <div className="ml-1 inline-block origin-[70%_70%] animate-waving-hand">
        👋
      </div>
    </div>
  )
}

export default Greeting
