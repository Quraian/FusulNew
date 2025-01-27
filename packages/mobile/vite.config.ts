import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { config } from 'dotenv';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isTesting = mode === 'test';

  config({
    path: path.resolve(__dirname, isTesting ? '../../.env.test' : '../../.env'),
  });

  return {
    plugins: [react()],
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
