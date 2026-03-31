import React from 'react';

interface CardProps {
  variant?: 'default' | 'highlighted' | 'purple';
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ variant = 'default', className = '', children }) => {
  const variantClasses = {
    default: 'bg-white border border-gray-100',
    highlighted: 'bg-white border-2 border-[#6C3AED]',
    purple: 'bg-gradient-to-br from-[#6C3AED] to-[#5020C0] text-white',
  };

  return (
    <div className={`rounded-2xl p-6 shadow-sm ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
