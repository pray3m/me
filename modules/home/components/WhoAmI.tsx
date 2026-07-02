import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { CSSProperties, FC } from "react"
import Image from "@/components/ds/image"

const BorderBeam: FC<{ size?: number; duration?: number }> = ({
  size = 200,
  duration = 8,
}) => (
  <div
    className="pointer-events-none absolute inset-0 rounded-[inherit]"
    style={{
      padding: "2px",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
    }}
  >
    <div
      className="absolute aspect-square animate-border-beam bg-linear-to-l from-[#6366f1] via-[#a855f7] to-transparent"
      style={
        {
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          "--border-beam-duration": `${duration}s`,
        } as CSSProperties
      }
    />
  </div>
)

const WhoAmI: FC = () => {
  return (
    <section className="lg:hidden">
      <div className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-3xl border-2 border-foreground/15 bg-muted shadow-[6px_6px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.12)]">
          <Image
            src="/images/prem.jpg"
            alt="Prem Gautam"
            width={640}
            height={420}
            rounded="rounded-3xl"
            className="h-full max-h-72 w-full object-cover"
          />
        </div>

        <div className="group relative overflow-hidden rounded-3xl border-2 border-white/10 bg-[#141414] p-6 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.4)]">
          <BorderBeam />

          <h2 className="mb-4 font-semibold text-2xl text-neutral-100 tracking-tight md:text-3xl">
            Who am I?
          </h2>

          <div className="space-y-4">
            <p className="text-base text-neutral-300 leading-relaxed">
              I&apos;m Prem, a full-stack engineer turning ideas into products
              people actually use.
            </p>
            <p className="text-base text-neutral-300 leading-relaxed">
              I build with React, Next.js, and Node.js. what drives me? creating
              stuff that looks great and just works.
            </p>
            <p className="text-base text-neutral-300 leading-relaxed">
              Always learning, always building. Let&apos;s make something
              awesome together!
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/about"
              className="group/link inline-flex items-center gap-2 text-white transition-colors hover:text-neutral-300"
            >
              <span className="font-semibold text-base">
                Read more about me
              </span>
              <ArrowRight
                size={20}
                className="transition-transform group-hover/link:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoAmI
