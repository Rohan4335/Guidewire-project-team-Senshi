import React from 'react';

interface BadgeProps {
  variant?: 'active' | 'high' | 'moderate' | 'low' | 'bestValue' | 'live' | 'completed' | 'info';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'active', children, className = '' }) => {
  const variantClasses = {
    active: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    high: 'bg-red-100 text-red-700 border border-red-200',
    moderate: 'bg-amber-100 text-amber-700 border border-amber-200',
    low: 'bg-gray-100 text-gray-600 border border-gray-200',
    bestValue: 'bg-[#6C3AED] text-white',
    live: 'bg-blue-100 text-blue-700 border border-blue-200',
    completed: 'bg-emerald-50 text-emerald-600',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
