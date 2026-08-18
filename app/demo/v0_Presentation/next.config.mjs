/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow LAN IP access in dev so /_next scripts are not blocked (Next.js 16+)
  allowedDevOrigins: ['192.168.1.29'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
