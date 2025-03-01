import { CapacitorConfig } from '@capacitor/cli';
// import { join } from 'path';

const config: CapacitorConfig = {
  appId: 'app.fusul',
  appName: 'Fusul2',
  // webDir: join(__dirname, '../..', 'dist/packages/mobile'),
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
