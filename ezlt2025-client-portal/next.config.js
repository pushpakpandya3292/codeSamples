/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public", // Service worker and PWA assets will be generated in the public folder
  register: true,
  skipWaiting: true, // Immediately activate new service worker
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["52.45.225.150"],
  },
};

module.exports = withPWA(nextConfig);
