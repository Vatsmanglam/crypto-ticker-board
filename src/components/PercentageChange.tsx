
import React from 'react';
import { ArrowUp, ArrowDown } from "lucide-react";

interface PercentageChangeProps {
  value: number;
  timeframe?: string;
}

const PercentageChange: React.FC<PercentageChangeProps> = ({ value, timeframe }) => {
  const isPositive = value >= 0;
  const color = isPositive ? 'text-emerald-500' : 'text-red-500';
  const Icon = isPositive ? ArrowUp : ArrowDown;

  return (
    <div className={`flex items-center justify-end ${color} font-medium text-right`}>
      <Icon className="h-4 w-4 mr-1" />
      {isPositive ? '+' : ''}
      {value.toFixed(2)}%
      {timeframe && <span className="text-xs text-muted-foreground ml-1">({timeframe})</span>}
    </div>
  );
};

export default PercentageChange;
