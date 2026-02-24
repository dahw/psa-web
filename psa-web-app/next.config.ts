import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const moduleExports: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Turbopack config (silences warning in dev)
  turbopack: {},
};

// https://docs.sentry.dev/platforms/javascript/guides/nextjs/
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin.
  // For example, if you wish to upload source maps to Sentry:
  // authToken: process.env.SENTRY_AUTH_TOKEN,
  // org: "your-org",
  // project: "your-project",

  silent: true, // Suppresses all logs
};

export default withSentryConfig(moduleExports, sentryWebpackPluginOptions);
