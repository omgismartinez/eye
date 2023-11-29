/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'z39deuzvs3yujlfm.public.blob.vercel-storage.com',
    ]
  }
}

module.exports = nextConfig
