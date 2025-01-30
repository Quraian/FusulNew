import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { config } from 'dotenv';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isTesting = mode === 'test';
  const isProduction = mode === 'production';

  // TODO: share configs?
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
    plugins: [react()],
    server: {
      port: 5173,
      host: 'localhost',
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
