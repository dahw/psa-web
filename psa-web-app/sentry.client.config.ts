import * as Sentry from "@sentry/nextjs";

// Client-side Sentry initialization. Customize options as needed.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "", // set in env
  tracesSampleRate: 0.1, // adjust in production
  environment: process.env.NODE_ENV,
});
