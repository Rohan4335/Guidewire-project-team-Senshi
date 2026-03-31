import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, label, sublabel, className = '' }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={className}>
      {(label || sublabel) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-gray-500">{label}</span>}
          {sublabel && <span className="text-sm text-gray-500">{sublabel}</span>}
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-[#3B82F6] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
