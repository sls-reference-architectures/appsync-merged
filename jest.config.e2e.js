const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  globalSetup: './common/jest.setup',
  testTimeout: 450000,
};
