module.exports = {
    extends: [
        '../.eslintrc.js',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:storybook/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/prop-types': 'off',
        'react/jsx-key': 'error',
    },
};
