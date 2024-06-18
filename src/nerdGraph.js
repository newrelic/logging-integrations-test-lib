
const retryingAxios = require('./retryingAxios');
const { sleep } = require('./time');
const logger = require('./logger');
const { HTTP_RETRY_COUNT, WAIT_BETWEEN_QUERY_RETRIES } = require('./waitTimeConfig');

/**
 * Makes a GraphQL call with retry logic. Uses `axios-retry` to make the call.
 *
 * @param {string} url - The URL to make the GraphQL call to.
 * @param {object} payload - The payload for the GraphQL call.
 * @param {object} configuration - The configuration for the GraphQL call.
 * @returns {Promise<object>} - A Promise that resolves to the response of the GraphQL call.
 */
const retryingGraphQlCall = async (url, payload, configuration) => {
  let response = null;

  // we use <= to make sure we try at least once
  for (let retry = 0; retry <= HTTP_RETRY_COUNT; ++retry) {
    // Pause before retrying
    if (retry > 0) {
      logger.debug(
        `GraphQL retry attempt ${retry}, waiting ${WAIT_BETWEEN_QUERY_RETRIES} milliseconds`
      );
      await sleep(WAIT_BETWEEN_QUERY_RETRIES);
    }

    // Make remote call
    response = await retryingAxios.post(url, payload, configuration);
    if (!response.data.errors) {
      break;
    }
    logger.debug('GraphQL call got error', response.data.errors);
  }

  return response;
};

module.exports = {
  retryingGraphQlCall,
};
