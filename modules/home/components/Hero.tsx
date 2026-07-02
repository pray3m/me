import { Laptop, MapPin } from "lucide-react"
import type { FC } from "react"
import BackgroundGradientAnimation from "@/components/blocks/BackgroundGradientAnimation"
import Greeting from "@/components/blocks/Greeting"

const Hero: FC = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-white/10 p-6 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)]">
      <BackgroundGradientAnimation />

      <div className="relative z-10">
        <h1 className="mb-4 flex flex-wrap items-center gap-x-2 font-semibold text-2xl text-white leading-tight md:text-3xl">
          <Greeting />
          <span className="inline-block origin-[70%_70%] animate-waving-hand text-3xl">
            👋
          </span>
          <span>I&apos;m Prem.</span>
        </h1>

        <p className="mb-8 font-bold text-white text-xl leading-tight">
          I craft{" "}
          <span className="rounded bg-white px-2 text-black">
            digital experiences
          </span>{" "}
          that people actually love. turning ideas into reality, at the speed of
          thought.
        </p>

        <div className="flex flex-col gap-3 font-medium text-base text-white/90">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="shrink-0" />
            <span>Based in Butwal, Nepal</span>
            <span aria-hidden="true">🇳🇵</span>
          </div>
          <div className="flex items-center gap-2">
            <Laptop size={20} className="shrink-0" />
            <span>Working Remotely</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
