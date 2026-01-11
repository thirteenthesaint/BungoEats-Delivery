import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function Section({ children, className = '', title, subtitle }: SectionProps) {
  return (
    <section className={`py-8 md:py-12 ${className}`}>
      {title && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
