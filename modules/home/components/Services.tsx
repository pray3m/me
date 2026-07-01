"use client"

import { Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { type FC } from "react"
import { CLIENT_IMAGES } from "@/common/constant/client"
import ImageCarousel from "@/components/blocks/ImageCarousel"
import Button from "@/components/ds/button"
import SectionHeading from "@/components/ds/section-heading"

const Services: FC = () => {
  const router = useRouter()

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
      <ImageCarousel images={CLIENT_IMAGES} interval={4000} />
      <div className="space-y-4 rounded-xl border bg-muted p-8 dark:border-none">
        <div className="flex items-center gap-1">
          <Send size={28} className="pt-1" />
          <h3 className="font-medium text-xl">Let&apos;s work together!</h3>
        </div>
        <p className="pl-2 text-muted-foreground leading-loose">
          I&apos;m open for freelance projects — feel free to email me and
          let&apos;s see how we can collaborate.
        </p>
        <Button onClick={() => router.push("/contact")}>Contact me</Button>
      </div>
    </section>
  )
}

export default Services
