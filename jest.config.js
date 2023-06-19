module.exports = {
  setupFilesAfterEnv: ['jest-extended/all'],
  transform: {
    '^.+\\.js?$': '@swc/jest',
  },
};
