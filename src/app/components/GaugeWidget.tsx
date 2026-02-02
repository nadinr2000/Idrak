interface GaugeWidgetProps {
  label: string;
  value: number;
  unit: string;
  maxValue: number;
  reverse?: boolean; // For O2 where high is good, low is bad
}

export function GaugeWidget({ label, value, unit, maxValue, reverse = false }: GaugeWidgetProps) {
  // Calculate percentage (0-100)
  // For reverse mode (O2), calculate based on deficit to keep arc in green zone
  const percentage = reverse 
    ? ((maxValue - value) / maxValue) * 100 
    : (value / maxValue) * 100;
  
  // Determine color for the progress fill based on percentage and reverse mode
  const getProgressColor = () => {
    if (reverse) {
      // For O2: low deficit is good (green), high deficit is bad (red)
      if (percentage < 30) return '#16a34a';
      if (percentage < 60) return '#eab308';
      return '#dc2626';
    } else {
      // For CO, CO2, Water: low is good (green), high is bad (red)
      if (percentage < 30) return '#16a34a';
      if (percentage < 60) return '#eab308';
      return '#dc2626';
    }
  };

  // Calculate the arc length for the filled portion
  const arcLength = 110; // Total arc length
  const filledLength = (percentage / 100) * arcLength;

  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="90" viewBox="0 0 120 100">
        <defs>
          {/* Define gradient for the background arc */}
          <linearGradient id={`gaugeGradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="50%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fecaca" />
          </linearGradient>
        </defs>
        
        {/* Background arc with gradient */}
        <path
          d="M 20 75 A 40 40 0 0 1 100 75"
          fill="none"
          stroke={`url(#gaugeGradient-${label})`}
          strokeWidth="10"
          strokeLinecap="round"
        />
        
        {/* Progress arc (dark colored overlay showing actual reading) */}
        <path
          d="M 20 75 A 40 40 0 0 1 100 75"
          fill="none"
          stroke={getProgressColor()}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filledLength} 1000`}
          className="transition-all duration-500"
        />
        
        {/* Value text */}
        <text x="60" y="65" textAnchor="middle" className="text-[16px] font-bold" fill="#1f2937">
          {value}
        </text>
        <text x="60" y="78" textAnchor="middle" className="text-[10px]" fill="#6b7280">
          {unit}
        </text>
        
        {/* Label */}
        <text x="60" y="95" textAnchor="middle" className="text-[11px] font-semibold" fill="#374151">
          {label}
        </text>
      </svg>
    </div>
  );
}