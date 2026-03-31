import React from 'react';

interface RiskGaugeProps {
  score: number;
  label: string;
  size?: number;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score, label, size = 180 }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const center = size / 2;

  const getColor = (score: number) => {
    if (score >= 75) return '#EF4444';
    if (score >= 50) return '#F59E0B';
    return '#10B981';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={getColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center label — absolutely positioned inside the relative div */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">{score}%</span>
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Score</span>
        </div>
      </div>
      <p className="mt-3 text-base font-semibold text-gray-700">{label}</p>
    </div>
  );
};

export default RiskGauge;
