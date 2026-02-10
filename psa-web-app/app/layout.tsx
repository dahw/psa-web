import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
        className={`${geistSans.variable} ${geistMono.variable} bg-[#0A0A0A] text-white font-sans antialiased`}
      >
        <Navigation />
        <main className="pt-20 pb-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
              to={createPageUrl("Notifications")}
              className="relative p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#6B8E23] rounded-full" />
              )}
            </Link>

            <Link
              to={createPageUrl("Profile")}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setShowMobileMenu((prev) => !prev)}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors md:hidden"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/98 pt-16 md:hidden">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  isActive(item.page)
                    ? "bg-[#4A5D23] text-white"
                    : "hover:bg-white/5 text-gray-400"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="font-medium text-lg">
                  {item.name}
                </span>
              </Link>
            ))}

            <Link
              to={createPageUrl("QRCode")}
              onClick={() => setShowMobileMenu(false)}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                isActive("QRCode")
                  ? "bg-[#4A5D23] text-white"
                  : "hover:bg-white/5 text-gray-400"
              }`}
            >
              <QrCode className="w-6 h-6" />
              <span className="font-medium text-lg">
                QR Code
              </span>
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 pb-24 md:pb-8 md:pl-20">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-20 flex-col items-center py-6 bg-[#0A0A0A] border-r border-white/5">
        <nav className="flex-1 flex flex-col items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={`p-3 rounded-2xl transition-all group relative ${
                isActive(item.page)
                  ? "bg-[#4A5D23] text-white"
                  : "hover:bg-white/5 text-gray-500 hover:text-white"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="absolute left-full ml-3 px-3 py-1.5 bg-[#1A1A1A] rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <Link
          to={createPageUrl("QRCode")}
          className={`p-3 rounded-2xl transition-all ${
            isActive("QRCode")
              ? "bg-[#4A5D23] text-white"
              : "hover:bg-white/5 text-gray-500 hover:text-white"
          }`}
        >
          <QrCode className="w-6 h-6" />
        </Link>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/5 md:hidden z-50">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive(item.page)
                  ? "text-[#6B8E23]"
                  : "text-gray-500"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
