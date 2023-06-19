const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  globalSetup: './test/common/jest.e2e.setup',
  testTimeout: 450000,
};
