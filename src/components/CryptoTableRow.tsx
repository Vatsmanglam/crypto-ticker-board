
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
  // Format numbers
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };
  
  const formatMarketCap = (num: number): string => {
    if (num >= 1_000_000_000_000) {
      return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    }
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    }
    return `$${num.toFixed(2)}`;
  };
  
  // Get color based on value
  const getChartColor = (changeValue: number): string => {
    return changeValue >= 0 ? '#10b981' : '#ef4444';
  };
  
  // Determine price class based on change
  const priceClass = cn(
    "font-medium transition-colors whitespace-nowrap",
    {
      'animate-pulse-price text-positive': asset.priceChange === 'up',
      'animate-pulse-price text-negative': asset.priceChange === 'down',
    }
  );

  return (
    <TableRow>
      <TableCell className="text-center font-medium">{asset.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <img 
            src={asset.logo} 
            alt={`${asset.name} logo`} 
            className="w-6 h-6" 
          />
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-xs text-muted-foreground">{asset.symbol}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className={priceClass}>
        {formatCurrency(asset.price)}
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
      <TableCell className="hidden md:table-cell">
        {formatMarketCap(asset.marketCap)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatMarketCap(asset.volume24h)}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {formatNumber(asset.circulatingSupply)} {asset.symbol}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {asset.maxSupply ? formatNumber(asset.maxSupply) : '∞'} {asset.symbol}
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
