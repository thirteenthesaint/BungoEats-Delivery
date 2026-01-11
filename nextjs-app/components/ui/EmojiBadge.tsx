import React from 'react';

interface EmojiBadgeProps {
  emoji: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function EmojiBadge({ emoji, size = 'md', className = '' }: EmojiBadgeProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xl',
    md: 'w-12 h-12 text-3xl',
    lg: 'w-16 h-16 text-5xl'
  };
  
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gray-100 flex items-center justify-center ${className}`}>
      <span>{emoji}</span>
    </div>
  );
}
