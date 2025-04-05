const defaultSEOConfig = {
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

export default defaultSEOConfig
