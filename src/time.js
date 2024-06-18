/**
 * Resolves after a given time in milliseconds.
 * @param {Number} milliseconds - The time in milliseconds to sleep.
 * @returns {Promise<void>} - A Promise that resolves after the specified time.
 */
const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

/**
 * Returns the current time in ISO 8601 format.
 * @returns {string} - The current time in ISO 8601 format.
 */
const currentTimeAsIso8601 = () => new Date().toISOString();

module.exports = {
  currentTimeAsIso8601,
  sleep,
};
