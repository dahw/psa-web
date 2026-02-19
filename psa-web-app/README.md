This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Error monitoring (Sentry)

This project includes a basic Sentry configuration. Set the following environment variables in your `.env.local` (or your hosting provider's settings) before building:

```env
# public DSN for browser
NEXT_PUBLIC_SENTRY_DSN=<your-client-dsn>
# private DSN for server-side
SENTRY_DSN=<your-server-dsn>
# secret used by the Sentry Next.js SDK
NEXTAUTH_SECRET=<some-random-string>
```

The `next.config.ts` is already wrapped with `withSentryConfig`, and configuration files `sentry.client.config.ts`/`sentry.server.config.ts` initialise the SDK. When installing dependencies, either pin Sentry to v8.26 (already done) or run:

```bash
npm install --legacy-peer-deps
# or use yarn/pnpm that ignore peer deps by default
```

## Authentication

This repo includes a basic `next-auth` setup. Install the package with `npm install next-auth@^4.24.13 --legacy-peer-deps` (or use your package manager of choice). After installing dependencies, you can sign in at `/auth/signin` using the dummy credentials `admin` / `secret` (see `app/api/auth/[...nextauth]/route.ts`). Protected pages under `/dashboard` and `/profile` are guarded by `middleware.ts`.

For production, replace the credential provider with your own user database or OAuth providers. You’ll also need to set environment variables for any providers you use. (If you bump `next-auth` in the future, run the install command again to fetch the latest supported version.)

## Performance & styling

- Run Lighthouse audits from Chrome DevTools or via the CLI (`npx lighthouse http://localhost:3000`) and address high‑priority issues such as large bundles, unused CSS, render‑blocking resources, or poor accessibility scores. Fixes you implement locally should be rerun until scores are satisfactory.
- **Latest audit results** (from the dev server):
  - Performance: 75 (⚠️ needs optimization)
  - Accessibility: 91 ✓
  - Best Practices: 100 ✓
  - SEO: 100 ✓
  - **Key recommendations**: Optimize LCP (Largest Contentful Paint) by using `<Image>` with priority for hero content; minimize auth redirects on non-protected pages; add preconnect hints for critical resources. Source maps improve debugging but are optional for development.
- Use `loading="lazy"` on `<img>` tags and prefer Next's `<Image>` component. Heavy third‑party libraries (e.g. the QR code generator) are dynamically imported to avoid bloating the initial bundle; you can apply the same pattern with `next/dynamic` for other components or icons.
- Tailwind purges unused CSS automatically using `tailwind.config.js` (see the `content` paths added). Keep those paths up to date when adding new directories.
- Unused dependencies like `react-calendar` have been removed to reduce install size and audit surface.

## Other notes

- This project ships with minimal global styles and utility components. Feel free to expand or replace them as your design system grows.
- Before deploying, verify your `.env.local` contains required keys (Sentry DSNs, `NEXTAUTH_SECRET`, any API tokens).
- The default install command now uses `--legacy-peer-deps` if you hit dependency conflicts due to Next 16.

---

## Deploy on Vercel
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
