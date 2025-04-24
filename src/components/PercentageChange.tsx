
import React from 'react';
import { TrendingUp, TrendingDown } from "lucide-react";

interface PercentageChangeProps {
  value: number;
  timeframe?: string;
}

const PercentageChange: React.FC<PercentageChangeProps> = ({ value, timeframe }) => {
  const isPositive = value >= 0;
  const color = isPositive ? 'text-positive' : 'text-negative';
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`flex items-center ${color} font-medium`}>
      <Icon className="h-4 w-4 mr-1" />
      {isPositive ? '+' : ''}
      {value.toFixed(2)}%
      {timeframe && <span className="text-xs text-muted-foreground ml-1">({timeframe})</span>}
    </div>
  );
};

export default PercentageChange;
