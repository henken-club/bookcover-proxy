import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testTimeout: 30000,
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['<rootDir>/src/**/test/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  reporters: ['default'],
};
export default config;
