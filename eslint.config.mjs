// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    rules: {
      'sonarjs/todo-tag': 'off',
    },
  },
  {
    ignores: [
      '**/dist',
      'packages/mobile/android/**/*',
      'packages/mobile/ios/**/*',
      '/coverage/**/*',
    ],
  }
);
