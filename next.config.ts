import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/ledger",
  experimental: {
    swcPlugins: [
      ["fluentui-next-appdir-directive", { paths: ["@griffel", "@fluentui"] }],
    ],
  },
};

export default nextConfig;
