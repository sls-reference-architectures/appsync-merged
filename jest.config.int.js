const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  globalSetup: './test/common/jest.int.setup',
  testTimeout: 60000,
};
