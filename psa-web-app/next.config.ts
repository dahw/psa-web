import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const moduleExports: NextConfig = {
  /* config options here */
  // an empty turbopack object silences the "webpack + no turbopack" error
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
