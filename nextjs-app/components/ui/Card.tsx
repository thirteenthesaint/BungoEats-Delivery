import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl md:rounded-3xl shadow-sm',
        {
          'hover:shadow-md transition-shadow duration-200 cursor-pointer': hover,
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-5 md:p-7': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
