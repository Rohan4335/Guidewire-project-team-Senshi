import React from 'react';

/**
 * Returns the correct Badge variant string based on a risk level label.
 */
export const getLevelVariant = (level: string): 'high' | 'moderate' | 'info' | 'low' => {
  const l = level.toLowerCase();
  if (l.includes('high')) return 'high';
  if (l.includes('moderate')) return 'moderate';
  if (l === 'low') return 'low';
  return 'info';
};

/**
 * Returns an icon element for risk insight types (rain, aqi, frequency, etc.)
 */
export const getInsightIcon = (icon: string): React.ReactNode => {
  switch (icon) {
    case 'rain':
      return (
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-500">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
          </svg>
        </div>
      );
    case 'aqi':
      return (
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-500">
            <path d="M4 10H8V20H4V10ZM10 4H14V20H10V4ZM16 13H20V20H16V13Z" fill="currentColor"/>
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#6C3AED]">
            <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="currentColor"/>
          </svg>
        </div>
      );
  }
};

/**
 * Returns a dashboard-style risk icon (circular) for risk indicator cards.
 */
export const getRiskIcon = (icon: string): React.ReactNode => {
  switch (icon) {
    case 'rain':
      return (
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-500">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor" opacity="0.3"/>
            <path d="M6.76 4.84L7.68 5.76C7.37 6.07 7.09 6.41 6.83 6.76L5.91 5.84C6.17 5.49 6.45 5.15 6.76 4.84Z" fill="currentColor"/>
          </svg>
        </div>
      );
    case 'aqi':
      return (
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-red-500">
            <path d="M4 10H8V20H4V10ZM10 4H14V20H10V4ZM16 13H20V20H16V13Z" fill="currentColor"/>
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-500">
            <path d="M15 13V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V13C6.79 14.66 6.34 17.79 8 20C9.66 22.21 12.79 22.66 15 21C17.21 19.34 17.66 16.21 16 14C15.64 13.53 15.33 13.24 15 13Z" fill="currentColor"/>
          </svg>
        </div>
      );
  }
};

/**
 * Returns the correct Badge variant for risk level badges used in dashboard.
 */
export const getRiskBadgeVariant = (level: string): 'high' | 'moderate' | 'low' => {
  switch (level.toLowerCase()) {
    case 'high': return 'high';
    case 'moderate': return 'moderate';
    default: return 'low';
  }
};

/**
 * Returns an icon for claims stat cards (rainfall, aqi, temperature).
 */
export const getStatIcon = (icon: string): React.ReactNode => {
  switch (icon) {
    case 'rainfall':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-blue-400">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor" opacity="0.5"/>
        </svg>
      );
    case 'aqi':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-gray-400">
          <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="currentColor"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-orange-400">
          <path d="M15 13V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V13C6.79 14.66 6.34 17.79 8 20C9.66 22.21 12.79 22.66 15 21C17.21 19.34 17.66 16.21 16 14C15.64 13.53 15.33 13.24 15 13Z" fill="currentColor" opacity="0.5"/>
        </svg>
      );
  }
};
