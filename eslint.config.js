import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		// Extends configuration (rule sets) from various plugins
		// These provide pre-configured best practices for each tool
		extends: [
			js.configs.recommended, // ESLint JS best practices (unused vars, unreachable code, etc.)
			...tseslint.configs.recommended, // TypeScript type safety rules
			react.configs.flat.recommended, // React best practices (keys in lists, prop validation, etc.)
			reactHooks.configs.flat.recommended, // Hook rules (dependency arrays, hook call order)
			reactRefresh.configs.vite, // Vite HMR specific rules
			jsxA11y.flatConfigs.recommended, // Accessibility (alt text, form labels, etc.)
			prettierConfig, // Disables formatting conflicts with Prettier
		],
		// Custom rule overrides
		rules: {
			'react/react-in-jsx-scope': 'off', // React 17+ doesn't need import React
			'react/prop-types': 'off', // Using TypeScript for type validation instead
		},
		// Parser configuration
		languageOptions: {
			globals: globals.browser, // Browser globals (window, document, fetch, etc.)
			parserOptions: {
				ecmaFeatures: {
					jsx: true, // Enable JSX syntax parsing
				},
			},
		},
		// Plugin-specific settings
		settings: {
			react: {
				version: 'detect', // Auto-detect React version from package.json
			},
		},
	},
]);
