import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../../.env') });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // root: './src',
  // build: {
  //   outDir: '../dist',
  //   minify: false,
  //   emptyOutDir: true,
  // },
  define: {
    'import.meta.env': process.env, // Make all variables available in import.meta.env
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
