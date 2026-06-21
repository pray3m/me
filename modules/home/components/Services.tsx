"use client"

import { Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { type FC } from "react"
import Button from "@/components/ds/button"
import SectionHeading from "@/components/ds/section-heading"

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
      <div className="space-y-4 rounded-xl border bg-muted p-8 dark:border-none">
        <div className="flex items-center gap-1">
          <Send size={28} className="pt-1" />
          <h3 className="font-medium text-xl">Lets work together!</h3>
        </div>
        <p className="pl-2 text-muted-foreground leading-loose">
          i&apos;m open for freelance projects, feel free to email me to see how
          can we collaborate.
        </p>
        <Button onClick={() => router.push("/contact")}>Contact me</Button>
      </div>
      {/* <ImageCarousel images={CLIENT_IMAGES} interval={4000} /> */}
    </section>
  )
}

export default Services
