module.exports = {
    ignorePatterns: ['!.*', 'build', 'node_modules'],
    env: {
        browser: true,
        amd: true,
        node: true,
        es2021: true,
    },
    settings: {
        'import/resolver': 'node',
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:eslint-comments/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'unused-imports'],
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'unused-imports/no-unused-imports': 'warn',
        'no-console': 'warn',
        'sort-imports': 'off',
        'import/no-unresolved': 'off',
    },
};
