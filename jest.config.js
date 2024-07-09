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
        '\\.(css|less)$': '<rootDir>/__mocks__/style-mock.ts',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/file-mock.ts',
        'src/(.*)$': '<rootDir>/src/$1',
    },
    coverageDirectory: path.join(__dirname, 'coverage/frontend'),
    collectCoverageFrom: [
        'src/components/**/*.{ts,tsx}',
        '!src/components/**/*.{types,stories,test,spec,constant}.{ts,tsx}',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    watchPlugins: [
        'jest-watch-select-projects',
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
};
