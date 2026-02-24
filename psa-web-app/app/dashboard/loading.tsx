import { Card } from '@/components/UI';

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[#2A2A2A] rounded ${className}`} />
  );
}

export default function DashboardLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Welcome Header Skeleton */}
      <div className="mb-8 md:mb-10">
        <Skeleton className="h-12 w-80 mb-2" />
        <Skeleton className="h-6 w-64" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-32">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Today's Workout Skeleton */}
        <div className="lg:col-span-2">
          <Skeleton className="h-8 w-40 mb-4" />
          <Card className="h-80 mb-6">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-24 w-full mb-6" />
            <Skeleton className="h-12 w-full" />
          </Card>

          <Skeleton className="h-8 w-40 mb-4" />
          <Card className="h-48" />
        </div>

        {/* Sidebar Skeleton */}
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-24" />
            ))}
          </div>
          <Card className="mt-6 h-48" />
        </div>
      </div>
    </div>
  );
}
