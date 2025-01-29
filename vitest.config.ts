import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    workspace: [
      'packages/api',
      'packages/common',
      'packages/data',
      'packages/mobile',
    ],
  },
});
