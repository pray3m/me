import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/seo"
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/seo/og"

export const alt = "Prem Gautam — Full Stack Developer & Tech Enthusiast"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: new URL(siteConfig.url).host,
      title: siteConfig.name,
      subtitle: "Full Stack Developer · Tech Enthusiast",
    }),
    OG_SIZE
  )
}
