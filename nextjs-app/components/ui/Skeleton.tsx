import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200',
        {
          'rounded-full': variant === 'circular',
          'rounded-lg': variant === 'rectangular',
          'rounded': variant === 'text',
        },
        className
      )}
    />
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" variant="text" />
        <Skeleton className="h-4 w-full" variant="text" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" variant="text" />
          <Skeleton className="h-6 w-20" variant="text" />
        </div>
      </div>
    </div>
  );
}

export function MenuItemSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <Skeleton className="w-full h-32" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-5 w-3/4" variant="text" />
        <Skeleton className="h-4 w-full" variant="text" />
        <Skeleton className="h-6 w-20" variant="text" />
      </div>
    </div>
  );
}
