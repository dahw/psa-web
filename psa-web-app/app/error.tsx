"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="flex h-screen items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-6">An unexpected error occurred.</p>
          <button
            className="px-4 py-2 bg-[#6B8E23] rounded-lg"
            onClick={reset}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
