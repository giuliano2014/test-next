const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ['media.graphassets.com'],
  },
  experimental: { images: { allowFutureImage: true } }
}

module.exports = nextConfig
