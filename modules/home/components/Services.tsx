import { Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { FC } from "react"
import { CLIENT_IMAGES } from "@/common/constant/client"
import Button from "@/components/ds/button"
import Marquee from "@/components/ds/marquee"
import SectionHeading from "@/components/ds/section-heading"

// The logo list is short, so repeat it until the track is wider than the
// content column — Marquee duplicates the track once more for a seamless loop.
const LOGO_LOOP = Array.from({ length: 4 }, () => CLIENT_IMAGES).flat()

const Services: FC = () => {
  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <SectionHeading title="What I've been working on" />
        <p className="leading-loose">
          I help companies and startups turn ideas into real products — from the
          interface people use down to the backend and infrastructure behind it.
          A few of the companies and products I&apos;ve worked on:
        </p>
      </div>
      <Marquee className="pt-5" duration="20s">
        {LOGO_LOOP.map((image, index) => (
          <Image
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt}
            width={76}
            height={76}
            className="size-16 rounded-full bg-card p-3 shadow-xs sm:size-[76px]"
          />
        ))}
      </Marquee>
      <div className="space-y-4 rounded-xl border bg-muted p-8 dark:border-none">
        <div className="flex items-center gap-1">
          <Send size={28} className="pt-1" />
          <h3 className="font-medium text-xl">Let&apos;s work together!</h3>
        </div>
        <p className="pl-2 text-muted-foreground leading-loose">
          I&apos;m open for freelance projects — feel free to email me and
          let&apos;s see how we can collaborate.
        </p>
        <Button nativeButton={false} render={<Link href="/contact" />}>
          Contact me
        </Button>
      </div>
    </section>
  )
}

export default Services
