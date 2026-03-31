import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${iconSizes[size]} bg-[#6C3AED] rounded-full flex items-center justify-center`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
          <path
            d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className={`font-bold text-[#6C3AED] ${sizeClasses[size]}`}>GiGuard</span>
    </div>
  );
};

export default Logo;
