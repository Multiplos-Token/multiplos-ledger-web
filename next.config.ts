import type { NextConfig } from 'next'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || null

if (basePath === null || basePath === '') {
  throw new Error(
    'Invalid basepath. It must be available in the environment variable NEXT_PUBLIC_BASE_PATH.'
  )
}

const nextConfig: NextConfig = {
  basePath,
  experimental: {
    swcPlugins: [
      ['fluentui-next-appdir-directive', { paths: ['@griffel', '@fluentui'] }],
    ],
  },
}

export default nextConfig
