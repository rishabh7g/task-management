/** @type {import('ts-jest').JestConfigWithTsJest} */
const path = require('path');

module.exports = {
    preset: 'ts-jest',
    rootDir: '.',
    testEnvironment: 'jest-environment-jsdom',
    displayName: 'frontend',
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
        'src/(.*)$': '<rootDir>/src/$1',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/file-mock.ts',
        '\\.(css|less)$': '<rootDir>/__mocks__/style-mock.ts',
    },
    coverageDirectory: path.join(__dirname, 'coverage/frontend'),
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    watchPlugins: [
        'jest-watch-select-projects',
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
};
