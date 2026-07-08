/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // Ensure environment variables are handled correctly
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  // Production settings
  ...(process.env.NODE_ENV === 'production' ? {
    // Ensure trailing slashes
    trailingSlash: true,
    // Disable image optimization
    images: {
      unoptimized: true
    }
  } : {})
};

export default nextConfig; 