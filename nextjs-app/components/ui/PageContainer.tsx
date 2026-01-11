import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`px-4 md:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
