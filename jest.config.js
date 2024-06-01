/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'jsdom', // For testing React components in a browser-like environment
   setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
   moduleNameMapper: {
      'src/(.*)$': '<rootDir>/src/$1',
   },
   testEnvironmentOptions: {
      customExportConditions: [''],
   },
};
