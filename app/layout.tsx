import Layout from "@/common/components/layouts";
import { AOSInit } from "@/common/utils/aos";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProvidersSandwich } from "./providers";

const inter = Inter({ subsets: ["latin"] });

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
    url: "https://premgautam.com.np",
    siteName: "Prem Gautam Portfolio",
    title: "Prem Gautam - Full Stack Developer & Tech Enthusiast",
    description:
      "Explore the portfolio of Prem Gautam, a passionate full stack developer and tech enthusiast.",
    images: [
      {
        url: "https://premgautam.com.np/og-image.jpg", // Replace with your actual OG image URL
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
    images: ["https://premgautam.com/twitter-image.jpg"], // Replace with your actual Twitter card image URL
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest", // Add a web app manifest file
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AOSInit />
      <body className="bg-light dark:bg-dark">
        <ProvidersSandwich>
          <Layout>{children}</Layout>
        </ProvidersSandwich>
      </body>
    </html>
  );
}
