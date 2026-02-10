import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";

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
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-[#0A0A0A] text-white font-sans antialiased`}
      >
        <Navigation />
        <main className="min-h-screen flex flex-col pt-16 md:pt-20 pb-6 md:pb-10 lg:pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
