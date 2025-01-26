import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // root: './src',
  // build: {
  //   outDir: '../dist',
  //   minify: false,
  //   emptyOutDir: true,
  // },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
