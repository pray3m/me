import { siteConfig } from "@/lib/seo"
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/seo/og"

export const alt =
  "Prem Gautam — Full-Stack Engineer & AI-Driven Product Builder"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    eyebrow: new URL(siteConfig.url).host,
    title: siteConfig.name,
    subtitle: "Full-Stack Engineer · AI-Driven Product Builder",
    avatar: true,
  })
}
