module.exports = {
  // Specify what to check and what not to check for coverage
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/.storybook/**',
    '!**/tests/**',
    '!**/coverage/**',
    '!jest.config.js',
  ],
  // coverageThreshold -> consider adding this in the future: https://jestjs.io/docs/configuration#coveragethreshold-object
  // ignore the following folders for tests
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/.storybook/'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  preset: 'ts-jest', // https://www.npmjs.com/package/ts-jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(css|scss|sass)$': 'jest-css-modules-transform'
  }
};