import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.fusul',
  appName: 'Fusul2',
  webDir: 'dist',
  includePlugins: [
    '@capacitor/app',
    '@capacitor/geolocation',
    '@capacitor/network',
    '@capacitor/preferences',
  ],
  // server: {
  //   url: 'http://192.168.100.5:4200',
  //   cleartext: true,
  // },
};

export default config;
