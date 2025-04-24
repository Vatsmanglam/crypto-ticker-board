
import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CryptoAsset, CryptoUpdate } from '../types/crypto';
import { sampleCryptoData } from '../data/sampleData';

interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

const initialState: CryptoState = {
  assets: sampleCryptoData,
  loading: false,
  error: null,
  lastUpdated: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action: PayloadAction<CryptoUpdate>) => {
      const { symbol, updates } = action.payload;
      const asset = state.assets.find(asset => asset.symbol === symbol);
      
      if (asset) {
        // Set previous price before updating
        const previousPrice = asset.price;
        
        // Apply all updates
        Object.assign(asset, updates);
        
        // Add price change flag for animation
        asset.priceChange = asset.price > previousPrice ? 'up' : 
                            asset.price < previousPrice ? 'down' : null;
                            
        // Update timestamp
        state.lastUpdated = Date.now();
      }
    },
    resetPriceChangeFlags: (state) => {
      state.assets.forEach(asset => {
        asset.priceChange = null;
      });
    }
  },
});

// Export actions
export const { updateCryptoPrice, resetPriceChangeFlags } = cryptoSlice.actions;

// Selectors
export const selectAllAssets = (state: RootState) => state.crypto.assets;
export const selectLastUpdated = (state: RootState) => state.crypto.lastUpdated;

// Memoized selector for a single asset by symbol
export const selectAssetBySymbol = createSelector(
  [selectAllAssets, (_, symbol: string) => symbol],
  (assets, symbol) => assets.find(asset => asset.symbol === symbol)
);

export default cryptoSlice.reducer;
