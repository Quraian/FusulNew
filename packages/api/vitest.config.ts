import swc from 'unplugin-swc';
import path from 'path';
import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@fusul/common': path.resolve(__dirname, '../common/src'),
      '@fusul/data': path.resolve(__dirname, '../data/src'),
      '@fusul/api': path.resolve(__dirname, '../api/src'),
    },
  },
  test: {
    globals: true,
    setupFiles: './vitest.setup.ts',
    root: './',
    environment: 'node',
    env: {
      ...config({ path: '../../.env.test' }).parsed,
    },
    testTimeout: 1000,
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
});
