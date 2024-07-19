import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src';
const baseTestDir = '<rootDir>/src';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: false,
    collectCoverageFrom: [`${baseDir}/**/*.ts`],
    testMatch: [`${baseTestDir}/**/*.spec.ts`],
};

export default config;
