// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        allowDefaultProject: ['*.js'],
        defaultProject: 'tsconfig.json',
      },
    },
  },
  {
    rules: {
      'sonarjs/todo-tag': 'off',
    },
  },
  {
    ignores: [
      '**/dist/**/*',
      'packages/mobile/android/**/*',
      'packages/mobile/ios/**/*',
      '/coverage/**/*',
      'packages/api/webpack.config.js',
    ],
  },
  eslintConfigPrettier,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['packages/mobile/**/*.{ts,tsx}', 'packages/website/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
