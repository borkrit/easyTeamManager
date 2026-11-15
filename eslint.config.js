import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import importFsdPlugin from 'eslint-plugin-import-fsd';

export default [
    {
        ignores: [
            'vendor/**/*', 
            'public/**/*', 
            'storage/**/*',
            'resources/js/generated/**/*',
            'dist/**/*',
            'build/**/*',
            'storybook-static/**/*',
        ],
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

            'no-restricted-syntax': [
                'error',
                {
                    selector: "CallExpression[callee.object.name='router'][callee.property.name=/^(post|put|patch|delete)$/]",
                    message: 'Прямые мутации через router (post/put/patch/delete) запрещены. Используй кастомные хуки (useApiMutation, useFormModal и т.д.).',
                },
            ], 
        },
    },
    {
        files: ['resources/js/shared/hooks/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-syntax': 'off',
        },
    },
    {
        files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off', 
        },
    },
    {
        files: ['resources/js/widgets/**/*.{ts,tsx}'],
        rules: {
            'import-fsd/no-denied-layers': 'error',
        },
    },
];