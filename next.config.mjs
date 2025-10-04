/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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

export default nextConfig
