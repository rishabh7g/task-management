/** @type {import('ts-jest').JestConfigWithTsJest} */
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
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
};
