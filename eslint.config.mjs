import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginJest from 'eslint-plugin-jest';
import noOnlyTests from 'eslint-plugin-no-only-tests';

export default defineConfig([
  globalIgnores(['.serverless']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    plugins: { js },
    rules: { 'max-params': ['warn', 1], 'no-param-reassign': ['error', { props: true }] },
  },
  {
    files: ['**/*.test.js'],
    plugins: { jest: pluginJest, 'no-only-tests': noOnlyTests },
    languageOptions: { globals: pluginJest.environments.globals.globals },
    rules: { 'no-only-tests/no-only-tests': 'error' },
  },
]);
