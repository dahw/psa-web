import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PSA - Push Sweat Achieve",
  description: "Your personal fitness companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} bg-[#0A0A0A] text-white font-sans antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
