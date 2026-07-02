import type { Viewport } from "next"
import { geistMono, onestSans } from "@/common/styles/fonts"
import Layout from "@/components/layout"
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
        <link
          rel="preconnect"
          href="https://gateway.umami.is"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://cloud.umami.is" />
        <JsonLd data={rootGraph()} />
        {/* Paper grain lives on body::after in globals.css. */}
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
