import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'fast-flow-market',
  webDir: 'dist/northwind-frontend',
  server: {
    androidScheme: 'https'
  }
};

export default config;
