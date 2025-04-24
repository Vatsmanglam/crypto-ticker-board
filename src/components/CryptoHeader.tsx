
import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectLastUpdated } from '../store/cryptoSlice';

const CryptoHeader: React.FC = () => {
  const lastUpdated = useAppSelector(selectLastUpdated);
  
  // Format last updated time
  const formattedTime = lastUpdated 
    ? new Date(lastUpdated).toLocaleTimeString()
    : 'Never';
    
  return (
    <div className="pb-6">
      <h1 className="text-3xl font-bold mb-2">Crypto Market</h1>
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Real-time cryptocurrency market data
        </p>
        <p className="text-sm text-muted-foreground">
          Last updated: <span className="font-medium">{formattedTime}</span>
        </p>
      </div>
    </div>
  );
};

export default CryptoHeader;
