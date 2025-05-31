// File: jest.config.js

module.exports = {
  // Use the Node environment (no DOM)
  testEnvironment: 'node',

  // Only run test files ending in .test.js under any __tests__ folder
  testMatch: ['**/__tests__/**/*.test.js'],

  // Print individual test results for debugging
  verbose: true,

  // Collect coverage and output to ./coverage
  collectCoverage: true,
  coverageDirectory: 'coverage'
};
