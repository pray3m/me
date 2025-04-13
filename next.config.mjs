/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["repository-images.githubusercontent.com", "premgautam.me"],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
