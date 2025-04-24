
import { store } from '../store/store';
import { updateCryptoPrice, resetPriceChangeFlags } from '../store/cryptoSlice';
import { CryptoAsset } from '../types/crypto';

class CryptoWebSocketService {
  private intervalId: number | null = null;
  private resetFlagsId: number | null = null;
  
  constructor(private updateInterval: number = 2000) {}
  
  // Start the mock WebSocket service
  connect(): void {
    if (this.intervalId === null) {
      console.log('Connecting to mock crypto WebSocket...');
      
      // Simulate receiving data every updateInterval milliseconds
      this.intervalId = window.setInterval(() => {
        this.generateRandomUpdate();
      }, this.updateInterval);
      
      // Reset price change flags for animation
      this.resetFlagsId = window.setInterval(() => {
        store.dispatch(resetPriceChangeFlags());
      }, 1000); // Reset animation flags after 1 second
    }
  }
  
  // Stop the mock WebSocket service
  disconnect(): void {
    if (this.intervalId !== null) {
      console.log('Disconnecting from mock crypto WebSocket...');
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      
      if (this.resetFlagsId !== null) {
        window.clearInterval(this.resetFlagsId);
        this.resetFlagsId = null;
      }
    }
  }
  
  // Generate a random update for a random asset
  private generateRandomUpdate(): void {
    const assets = store.getState().crypto.assets;
    if (!assets.length) return;
    
    // Pick 1-3 random assets to update
    const numUpdates = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...assets].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < numUpdates && i < shuffled.length; i++) {
      const asset = shuffled[i];
      const updates = this.createRandomUpdates(asset);
      
      store.dispatch(updateCryptoPrice({
        symbol: asset.symbol,
        updates
      }));
    }
  }
  
  // Create random updates for price, volumes and percentages
  private createRandomUpdates(asset: CryptoAsset): Partial<CryptoAsset> {
    // Generate a price change between -2% and +2%
    const priceChangePct = (Math.random() * 4 - 2) / 100;
    const newPrice = asset.price * (1 + priceChangePct);
    
    // Update percentages slightly
    const change1h = asset.change1h + (Math.random() * 0.4 - 0.2);
    const change24h = asset.change24h + (Math.random() * 0.6 - 0.3);
    const change7d = asset.change7d + (Math.random() * 0.8 - 0.4);
    
    // Update volume between -5% and +5%
    const volumeChangePct = (Math.random() * 10 - 5) / 100;
    const newVolume = asset.volume24h * (1 + volumeChangePct);
    
    return {
      price: parseFloat(newPrice.toFixed(2)),
      change1h: parseFloat(change1h.toFixed(2)),
      change24h: parseFloat(change24h.toFixed(2)), 
      change7d: parseFloat(change7d.toFixed(2)),
      volume24h: Math.round(newVolume),
    };
  }
}

// Export a singleton instance
export const cryptoWebSocketService = new CryptoWebSocketService();
