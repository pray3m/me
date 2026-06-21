/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "repository-images.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "premgautam.me",
        pathname: "**",
      },
    ],
  },
  experimental: {
    viewTransition: true,
  },
}

let config = nextConfig
if (process.env.ANALYZE === "true") {
  const { default: bundleAnalyzer } = await import("@next/bundle-analyzer")
  config = bundleAnalyzer({ enabled: true })(nextConfig)
}

export default config
