import type { NextConfig } from 'next'

const basePath = '/ledger'

const nextConfig: NextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    swcPlugins: [
      ['fluentui-next-appdir-directive', { paths: ['@griffel', '@fluentui'] }],
    ],
  },
}

export default nextConfig
