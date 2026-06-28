import type { Viewport } from "next"
import type { CSSProperties } from "react"
import { geistMono, onestSans } from "@/common/styles/fonts"
import Layout from "@/components/layout"
import { NoiseTexture } from "@/components/ui/noise-texture"
import { JsonLd, rootGraph, rootMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"
import "./globals.css"
import Script from "next/script"
import { ProvidersSandwich } from "./providers"

export const metadata = rootMetadata

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f9fd" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1115" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={cn("min-h-screen", onestSans.variable, geistMono.variable)}
      >
        <JsonLd data={rootGraph()} />
        <NoiseTexture
          aria-hidden
          octaves={3}
          frequency={0.65}
          className="fixed inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_75%_at_50%_30%,#000,transparent)] [mix-blend-mode:var(--paper-pattern-blend)]"
          style={{ opacity: "var(--paper-pattern-opacity)" } as CSSProperties}
        />
        <ProvidersSandwich>
          <Layout>{children}</Layout>
        </ProvidersSandwich>

        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="41fe1939-48a0-42dc-b7df-0399def615f2"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
