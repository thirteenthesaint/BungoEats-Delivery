import { ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium border',
        {
          'bg-gray-100 text-gray-700 border-gray-200': variant === 'default',
          'bg-green-100 text-green-700 border-green-200': variant === 'success',
          'bg-yellow-100 text-yellow-700 border-yellow-200': variant === 'warning',
          'bg-red-100 text-red-700 border-red-200': variant === 'error',
          'bg-blue-100 text-blue-700 border-blue-200': variant === 'info',
          'bg-orange-100 text-orange-700 border-orange-200': variant === 'secondary',
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-1.5 text-sm': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
