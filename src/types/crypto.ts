
export interface CryptoAsset {
  id: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  sparkline: number[]; // 7 day price history data points
  priceChange: 'up' | 'down' | null; // For animation purposes
}

export interface CryptoUpdate {
  symbol: string;
  updates: Partial<CryptoAsset>;
}
