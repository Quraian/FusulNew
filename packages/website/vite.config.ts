import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4201,
    host: 'localhost',
  },
  preview: {
    port: 4301,
    host: 'localhost',
  },
  build: {
    outDir: '../../dist/packages/website',
    emptyOutDir: true,
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/website',
      provider: 'v8',
    },
    setupFiles: [resolve(__dirname, './setupTests.ts')],
  },
});
