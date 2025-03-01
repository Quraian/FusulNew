import path, { join } from 'path';
import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isTesting = mode === 'test';
  const isProduction = mode === 'production';

  if (isTesting) {
    config({
      path: path.resolve('../../.env.test'),
    });
  } else if (isProduction) {
    config({
      path: path.resolve('../../.env.production'),
    });
  } else {
    config({
      path: path.resolve('../../.env'),
    });
  }

  return {
    plugins: [react(), legacy()],
    base: '/app/',
    build: {
      outDir: join(__dirname, '../..', 'dist/packages/mobile'),
      // assetsDir: './assets',
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      host: 'localhost',
      watch: {
        usePolling: true,
      },
    },
    preview: {
      port: 5174,
      host: 'localhost',
    },
    define: {
      'import.meta.env': process.env, // Make all variables available in import.meta.env
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  };
});
