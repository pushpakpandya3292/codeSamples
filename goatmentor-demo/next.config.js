const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: ["app-build-manifest.json"],
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
      },
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/applicantTest',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors "self" https://*',
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
