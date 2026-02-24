'use client';

import { useState, type ComponentType, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  Dumbbell,
  Calendar,
  QrCode,
  Bell,
  User,
  Menu,
  X,
} from 'lucide-react';

type NavItem = {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Workouts', href: '/workouts', icon: Dumbbell },
  { name: 'Booking', href: '/booking', icon: Calendar },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const unreadNotifications = 0;

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <style jsx global>{`
        :root {
          --psa-black: #0A0A0A;
          --psa-olive: #4A5D23;
          --psa-olive-light: #6B8E23;
          --psa-grey: #1A1A1A;
          --psa-grey-light: #2A2A2A;
          --psa-text: #E5E5E5;
          --psa-text-muted: #888888;
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: var(--psa-olive) var(--psa-grey);
        }

        *::-webkit-scrollbar {
          width: 6px;
        }

        *::-webkit-scrollbar-track {
          background: var(--psa-grey);
        }

        *::-webkit-scrollbar-thumb {
          background: var(--psa-olive);
          border-radius: 3px;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-[#6B8E23]/30">
              <Image
                src="/Workout.png"
                alt="Push Sweat Achieve"
                fill
                sizes="48px"
                priority
                className="object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.3em] text-[#9CA3AF]">Push Sweat</span>
              <span className="text-lg font-black tracking-tight">Achieve</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/notifications"
              className="relative p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#6B8E23] rounded-full" />
              )}
            </Link>

            <Link
              href="/profile"
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setShowMenu((open) => !open)}
              className="hidden md:flex p-2 rounded-xl hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation"
            >
              {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setShowMenu((open) => !open)}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {showMenu && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/98 pt-16 md:hidden">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMenu(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    isActive(item.href)
                      ? 'bg-[#4A5D23] text-white'
                      : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-medium text-lg">{item.name}</span>
                </Link>
              );
            })}
            <Link
              href="/qrcode"
              onClick={() => setShowMenu(false)}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                isActive('/qrcode')
                  ? 'bg-[#4A5D23] text-white'
                  : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <QrCode className="w-6 h-6" />
              <span className="font-medium text-lg">QR Code</span>
            </Link>
          </nav>
        </div>
      )}

      {showMenu && (
        <div className="hidden md:block fixed left-4 top-20 z-40">
          <nav className="w-64 rounded-2xl border border-white/10 bg-[#0A0A0A]/95 backdrop-blur shadow-2xl shadow-black/40 p-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMenu(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-[#4A5D23] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/qrcode"
              onClick={() => setShowMenu(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive('/qrcode')
                  ? 'bg-[#4A5D23] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <QrCode className="w-5 h-5" />
              QR Code
            </Link>
          </nav>
        </div>
      )}

      <main className="pt-20 md:pt-24 lg:pt-28 pb-28 md:pb-16 lg:pb-20">
        <div className="w-full max-w-[90rem] px-6 sm:px-10 lg:px-16 xl:px-20 mx-auto">
          {children}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/5 md:hidden z-50">
        <div className="flex items-center justify-around py-2 px-2 max-w-3xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  isActive(item.href) ? 'text-[#6B8E23]' : 'text-gray-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] font-semibold tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
