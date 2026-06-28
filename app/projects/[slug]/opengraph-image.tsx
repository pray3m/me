import { ImageResponse } from "next/og"
import { PROJECTS } from "@/data/projects"
import { siteConfig } from "@/lib/seo"
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/seo/og"

export const alt = "Project — Prem Gautam"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  return new ImageResponse(
    ogCard({
      eyebrow: `${new URL(siteConfig.url).host} / projects`,
      title: project?.title ?? "Projects",
      subtitle: project?.description?.slice(0, 140),
    }),
    OG_SIZE
  )
}
