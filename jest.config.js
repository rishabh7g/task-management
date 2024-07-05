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
    },
    coverageDirectory: path.join(__dirname, 'coverage/frontend'),
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
};
