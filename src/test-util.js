
const { spawnSync } = require('child_process');
const logger = require('./logger').getLogger();
const { sleep } = require('./time');
const { WAIT_BETWEEN_QUERY_RETRIES } = require('./waitTimeConfig');

/**
 * Makes a test optional based on the presence of an environment variable.
 * @param {string} environmentVariableName - The name of the environment variable to check.
 * @returns 
 */
const testOnlyIfSet = (environmentVariableName) => {
  return process.env[environmentVariableName] ? test : test.skip;
};

/**
 * 
 * @param {object} nrdb - The NRDB client object.
 * @param {string} substring - The substring to search for in the log messages.
 * @param {string} plugin - The plugin type to search for in the log messages.
 * @returns 
 */
const waitForLogMessageContaining = async (nrdb, substring, plugin) => {
  let condition = `message like '%${substring}%'`;
  if (typeof plugin === 'string')
  {
    condition += ` and plugin.type = '${plugin}'`;
  }
  return nrdb.waitToFindOne({
    where: condition
  });
};

/**
 * Counts the occurrences of log messages in NRDB that match the specified substring and other conditions.
 * Retries the count operation until the expected count is reached or a maximum number of retries is reached.
 * Throws an error if the count does not match the expected count.
 *
 * @param {object} nrdb - The NRDB client object.
 * @param {string} substring - The substring to search for in the log messages.
 * @param {number} expectedCount - The expected count of log messages.
 * @returns {Promise<number>} - The expected count of log messages.
 * @throws {string} - Throws an error if the count does not match the expected count.
 */
const countAll = async (nrdb, substring, expectedCount, plugin, tags) => {
  let nRetries = 60;

  let where = `message like '%${substring}%'`;
  where += plugin ? ` and plugin.type = '${plugin}'` : '';

  if (typeof tags == 'object') {
    for (let key in tags) {
      if (!tags.hasOwnProperty(key)) continue;
      where += ` and tags.${key} = '${tags[key]}'`;
    }
  }

  while (nRetries--) {
    let result = await nrdb.waitToFindOne({
      where,
      select: 'count(*)',
    });
    if (result.count === expectedCount) return expectedCount;
    else
      console.log(
        'Count not matching, expected: ' +
          expectedCount +
          ', actual: ' +
          result.count
      );
    await sleep(WAIT_BETWEEN_QUERY_RETRIES);
  }

  throw 'Logs count did not match';
};

/**
 * Executes a command synchronously and checks the exit code.
 * @param {string} command - The command to execute.
 * @param {string[]} commandArguments - The arguments to pass to the command.
 * @param {number} expectedExitCode - The expected exit code of the command.
 */
const executeSync = (command, commandArguments, expectedExitCode) => {
  const result = spawnSync(command, commandArguments);

  logger.info(result.stdout?.toString());
  logger.error(result.stderr?.toString());
  expect(result.status).toEqual(expectedExitCode);
};

module.exports = {
  testOnlyIfSet,
  waitForLogMessageContaining,
  countAll,
  executeSync,
};
