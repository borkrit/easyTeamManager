import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import importFsdPlugin from 'eslint-plugin-import-fsd';

export default [
    {
        ignores: ['vendor/**/*', 'public/**/*', 'storage/**/*','resources/js/generated/**/*','dist/**/*',
            'build/**/*','storybook-static/**/*',],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser, 
                ...globals.node,    
            },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            react: pluginReact,
            'import-fsd': importFsdPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
            fsd: {
                rootDir: './resources/js', 
                aliases: {
                    '@/*': './resources/js/*',
                },
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

            'import-fsd/no-denied-layers': 'error', 
        },
    },
    
];