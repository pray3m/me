"use client"

import Button from "@/common/components/elements/Button"
import ImageCarousel from "@/common/components/elements/ImageCarousel"
import SectionHeading from "@/common/components/elements/SectionHeading"
import { CLIENT_IMAGES } from "@/common/constant/client"
import { useRouter } from "next/navigation"
import { type FC } from "react"
import Icon from "supercons"

const Services: FC = () => {
  const router = useRouter()

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <SectionHeading title="What I've been working on" />
        <p className="leading-loose">
          I assist brands, companies, institutions, and startups in creating
          exceptional digital experiences for their businesses through strategic
          development services. Here are a few notable clients I have
          collaborated with.
        </p>
      </div>
      <div className="space-y-4 rounded-xl border bg-neutral-100 p-8 dark:border-none dark:bg-neutral-800">
        <div className="flex items-center gap-1">
          <Icon glyph="send-fill" size={28} className="pt-1" />
          <h3 className="text-xl font-medium">Lets work together!</h3>
        </div>
        <p className="pl-2 leading-loose text-neutral-800 dark:text-neutral-300">
          i&apos;m open for freelance projects, feel free to email me to see how
          can we collaborate.
        </p>
        <Button onClick={() => router.push("/contact")}>Contact me</Button>
      </div>
      <ImageCarousel images={CLIENT_IMAGES} interval={4000} />
    </section>
  )
}

export default Services
