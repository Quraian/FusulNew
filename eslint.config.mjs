// @ts-check

import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
// import pluginReact from 'eslint-plugin-react';

const compat = new FlatCompat();

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  // pluginReact.configs.flat?.recommended, // doesn't work
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:react-hooks/recommended'),
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
  },
  eslintConfigPrettier,
  jsxA11y.flatConfigs.recommended
);
