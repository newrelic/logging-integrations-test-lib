/**
 * Retrying Axios
 * 
 * This module exports an instance of Axios with retry functionality for failed requests.
 * It uses the axios-retry library to automatically retry failed requests based on the specified conditions.
 * The retry conditions include network errors, retryable errors, rate limiting (429 status), and unsuccessful POST requests (404 status).
 * 
 * Dependencies:
 * - axios: Promise-based HTTP client for the browser and Node.js
 * - axios-retry: Axios plugin for automatic retrying of failed requests
 * - logger: Custom logger module
 * - waitTimes: Module containing wait times for retrying requests
 * 
 * @module retryingAxios
 * @exports axios - An instance of Axios with retry functionality
 */

const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const logger = require('./logger').getLogger();
const { WAIT_BETWEEN_QUERY_RETRIES } = require('./waitTimeConfig');
const { HTTP_RETRY_COUNT } = require('./waitTimeConfig');

// Retry every failed axios request to be able to get past transient errors
axiosRetry(axios, {
  retries: HTTP_RETRY_COUNT,
  retryDelay: (retryCount) => {
    logger.debug(
      `Axios retry attempt ${retryCount}, waiting ${WAIT_BETWEEN_QUERY_RETRIES} milliseconds`
    );
    return WAIT_BETWEEN_QUERY_RETRIES;
  },
  retryCondition: (error) => {
    return (
      // Since request didn't get to server, safe to try again
      axiosRetry.isNetworkError(error) ||
      // If the error indicates that the service didn't process the request successfully, safe to try again
      axiosRetry.isRetryableError(error) ||
      // isRetryableError does not include 429. We're over our rate limit for the moment,
      // but if we wait a bit, we may no longer be rate limited
      error.response.status === 429 ||
      // Note that we don't use `axiosRetry.isIdempotentRequestError`, since that function doesn't
      // think that POST should be retried (since it's not idempotent). However, all the above error
      // cases should mean that the server hasn't successfully processed the request, so even though
      // a POST is not idempotent, our POST is safe to retry since the previous
      // POST was unsuccessful
      error.response.status === 404
    );
  },
});

module.exports = axios;
