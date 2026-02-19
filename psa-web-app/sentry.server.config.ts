import * as Sentry from "@sentry/nextjs";

// Server-side Sentry initialization. This runs on the Node server side.
Sentry.init({
  dsn: process.env.SENTRY_DSN || "", // private DSN
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
