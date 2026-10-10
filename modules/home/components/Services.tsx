import { Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { FC } from "react"
import { CLIENT_IMAGES } from "@/common/constant/client"
import Button from "@/components/ds/button"
import IconTile from "@/components/ds/icon-tile"
import Marquee from "@/components/ds/marquee"
import SectionHeading from "@/components/ds/section-heading"
import { siteConfig } from "@/lib/seo"

// The logo list is short, so repeat it until the track is wider than the
// content column — Marquee duplicates the track once more for a seamless loop.
const LOGO_LOOP = Array.from({ length: 4 }, () => CLIENT_IMAGES).flat()

const Services: FC = () => {
  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <SectionHeading title="What I've been working on" />
        <p className="text-body">
          I help companies and startups turn ideas into real products — from the
          interface people use down to the backend and infrastructure behind it.
          A few of the companies and products I&apos;ve worked on:
        </p>
      </div>
      <ul className="sr-only">
        {CLIENT_IMAGES.map((image) => (
          <li key={image.src}>{image.alt}</li>
        ))}
      </ul>
      <div className="overflow-hidden rounded-xl border border-border">
        <div aria-hidden="true" className="border-border border-b py-4">
          <Marquee duration="20s">
            {LOGO_LOOP.map((image, index) => (
              <Image
                key={`${image.src}-${index}`}
                src={image.src}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-md border border-border bg-muted p-2 ring-1 ring-border/50 ring-offset-1 ring-offset-background"
              />
            ))}
          </Marquee>
        </div>
        <div className="flex items-center">
          <IconTile className="mx-4">
            <Send />
          </IconTile>
          <div className="flex flex-1 flex-col gap-3 border-border border-l border-dashed p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-medium text-foreground leading-snug">
                Let&apos;s work together!
              </h3>
              {/* The address is spelled out, not just linked through to
                  /contact — this is the page's one conversion action, so it
                  shouldn't cost a navigation. */}
              <p className="mt-0.5 text-muted-foreground text-sm">
                I&apos;m open for freelance projects — email me at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="rounded-sm font-medium text-foreground underline underline-offset-2 outline-none transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {siteConfig.email}
                </a>{" "}
                and let&apos;s see how we can collaborate.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/contact" />}
              size="sm"
              className="self-start sm:self-auto"
            >
              Contact me
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
