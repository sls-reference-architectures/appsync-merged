const EXPIRES_AFTER_DAYS = 300;
const SECONDS_PER_DAY = 24 * 60 * 60;

module.exports = {
  mergedApiKeyExpiresAt: () => Math.floor(Date.now() / 1000) + EXPIRES_AFTER_DAYS * SECONDS_PER_DAY,
};
