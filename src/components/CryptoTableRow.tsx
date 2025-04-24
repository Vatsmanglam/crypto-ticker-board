
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { CryptoAsset } from '../types/crypto';
import SparklineChart from './SparklineChart';
import PercentageChange from './PercentageChange';
import { cn } from '@/lib/utils';

interface CryptoTableRowProps {
  asset: CryptoAsset;
}

export const CryptoTableRow: React.FC<CryptoTableRowProps> = ({ asset }) => {
  // Format numbers with correct decimal places
  const formatPrice = (num: number): string => {
    if (num >= 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(num);
    }
    // For prices less than 1, show more decimal places
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(num);
  };
  
  const formatLargeNumber = (num: number): string => {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    }
    return num.toLocaleString();
  };
  
  const formatSupply = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(num);
  };
  
  // Get chart color based on 7d change
  const getChartColor = (changeValue: number): string => {
    return changeValue >= 0 ? '#22c55e' : '#ef4444';
  };
  
  // Determine price class based on change
  const priceClass = cn(
    "font-medium transition-colors whitespace-nowrap text-right",
    {
      'animate-pulse-price text-emerald-500': asset.priceChange === 'up',
      'animate-pulse-price text-red-500': asset.priceChange === 'down',
    }
  );

  // Add an error handler for image loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://placehold.co/24x24/png"; // Fallback image
    console.log(`Image failed to load for ${asset.name}`);
  };

  return (
    <TableRow className="hover:bg-secondary/40">
      <TableCell className="font-medium text-center">{asset.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <img 
            src={asset.logo} 
            alt={`${asset.name} logo`} 
            className="w-6 h-6 rounded-full" 
            onError={handleImageError}
            loading="lazy"
          />
          <div className="flex flex-col items-start">
            <span className="font-semibold">{asset.name}</span>
            <span className="text-xs text-muted-foreground">{asset.symbol}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className={priceClass}>
        {formatPrice(asset.price)}
      </TableCell>
      <TableCell>
        <PercentageChange value={asset.change1h} />
      </TableCell>
      <TableCell>
        <PercentageChange value={asset.change24h} />
      </TableCell>
      <TableCell>
        <PercentageChange value={asset.change7d} />
      </TableCell>
      <TableCell className="hidden md:table-cell text-right">
        {formatLargeNumber(asset.marketCap)}
      </TableCell>
      <TableCell className="hidden md:table-cell text-right">
        {formatLargeNumber(asset.volume24h)}
        <div className="text-xs text-muted-foreground">
          {formatSupply(asset.volume24h / asset.price)} {asset.symbol}
        </div>
      </TableCell>
      <TableCell className="hidden lg:table-cell text-right">
        {formatSupply(asset.circulatingSupply)} {asset.symbol}
      </TableCell>
      <TableCell className="hidden lg:table-cell text-right">
        {asset.maxSupply ? formatSupply(asset.maxSupply) : '∞'} {asset.symbol}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <SparklineChart 
          data={asset.sparkline} 
          color={getChartColor(asset.change7d)} 
        />
      </TableCell>
    </TableRow>
  );
};
