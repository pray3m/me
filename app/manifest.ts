import type { MetadataRoute } from "next"
import { siteConfig, siteName } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0d1115",
    theme_color: "#0d1115",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  }
}
