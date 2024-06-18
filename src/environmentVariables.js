
/**
 * Test function that checks if an environment variable is defined and throws an error if not.
 * 
 * @param {string} name - The name of the environment variable to check.
 * @returns {string} - The value of the environment variable.
 * @throws {Error} - If the environment variable is not defined.
 * 
 * @example
 * // Usage example
 * const value = requireEnvironmentVariable('MY_ENV_VARIABLE');
 * console.log(value); // Output: The value of MY_ENV_VARIABLE
 */
const requireEnvironmentVariable = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`No value was for provided for environment variable '${name}'`);
  }
  
  return value;
};

module.exports = {
  requireEnvironmentVariable
};