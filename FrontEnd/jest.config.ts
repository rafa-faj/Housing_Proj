import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
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
    '<rootDir>/.storybook/',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  preset: 'ts-jest', // needed to test typescript code, https://www.npmjs.com/package/ts-jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // needed to test scss code, https://www.npmjs.com/package/jest-css-modules-transform
    '^.+\\.(css|scss|sass)$': 'jest-css-modules-transform',
    // needed to convert SVG's to snapshots, https://www.npmjs.com/package/jest-svg-transformer
    '^.+\\.svg$': 'jest-svg-transformer',
    // For all other files, just use the file name (using a customer transformer)
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/transformers/file.js',
  },
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  snapshotResolver: '<rootDir>/__snapshots__/snapshotResolver.js',
};

export default config;
