
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { cryptoWebSocketService } from '../services/cryptoWebSocketService';
import CryptoTable from '../components/CryptoTable';
import CryptoHeader from '../components/CryptoHeader';
import { Card, CardContent } from '@/components/ui/card';

const CryptoApp: React.FC = () => {
  // Connect to mock WebSocket when component mounts
  useEffect(() => {
    cryptoWebSocketService.connect();
    
    // Disconnect when component unmounts
    return () => {
      cryptoWebSocketService.disconnect();
    };
  }, []);

  return (
    <div className="container py-8">
      <CryptoHeader />
      <Card className="overflow-hidden border-secondary">
        <CardContent className="p-0">
          <CryptoTable />
        </CardContent>
      </Card>
    </div>
  );
};

// We wrap the entire app with the Redux Provider
const Index: React.FC = () => {
  return (
    <Provider store={store}>
      <CryptoApp />
    </Provider>
  );
};

export default Index;
