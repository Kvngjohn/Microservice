// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  reporters: [
    'default',
    [ 'jest-junit', {
        outputDirectory: './jest-results',
        outputName: 'results.xml',      // produce results.xml (not JSON)
        suiteName: 'unit-tests',        // optional
        addFileAttribute: true          // optional: include <file> in the XML
      }
    ]
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
};
