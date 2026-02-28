import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import Layout from "@/components/layout"
import { cn } from "@/lib/utils"
import { jakartaSans, soraSans } from "@/common/styles/fonts"
import "./globals.css"
import { ProvidersSandwich } from "./providers"

export const metadata: Metadata = {
  title: "Prem Gautam - Full Stack Developer | Tech Enthusiast",
  description:
    "Personal website of Prem Gautam, a learner and full stack developer passionate about technology and innovation.",
  keywords:
    "prem gautam,prem, prem gautam, pray3m , Prem Gautam, Full Stack Developer, Web Development, Tech Enthusiast, Portfolio",
  authors: [{ name: "Prem Gautam" }],
  creator: "Prem Gautam",
  publisher: "Prem Gautam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://premgautam.me",
    siteName: "Prem Gautam Portfolio",
    title: "Prem Gautam - Full Stack Developer & Tech Enthusiast",
    description:
      "Explore the portfolio of Prem Gautam, a passionate full stack developer and tech enthusiast.",
    images: [
      {
        url: "https://premgautam.me/og-image.jpg", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Prem Gautam Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pray3m_",
    creator: "@pray3m_",
    title: "Prem Gautam - Full Stack Developer & Tech Enthusiast",
    description:
      "Explore the portfolio of Prem Gautam, a passionate full stack developer and tech enthusiast.",
    images: ["https://premgautam.me/twitter-image.jpg"], // Replace with your actual Twitter card image URL
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="41fe1939-48a0-42dc-b7df-0399def615f2"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          jakartaSans.variable,
          soraSans.variable
        )}
      >
        <ProvidersSandwich>
          <Layout>{children}</Layout>
          <Analytics />
        </ProvidersSandwich>
      </body>
    </html>
  )
}
