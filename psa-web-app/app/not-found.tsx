import Link from 'next/link';
import { Button } from '@/components/UI';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-[#6B8E23] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-[#9CA3AF] mb-8 max-w-md">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button variant="primary" className="flex items-center gap-2">
              <Home size={18} />
              Go Home
            </Button>
          </Link>
          <Link href="/workouts">
            <Button variant="secondary" className="flex items-center gap-2">
              <Search size={18} />
              Browse Workouts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
