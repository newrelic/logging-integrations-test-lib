const process = require('process');
const { createLogger, format, transports } = require('winston');
const { combine, json, timestamp, errors } = format;

const consoleTransport = new transports.Console({
  level: process.env.LOG_LEVEL || 'debug',
});

/**
 * Creates a logger with the specified service name.
 * @param {string} serviceName - The name of the service.
 * @returns {Logger} The created logger instance.
 */
function logger(serviceName) {
  return createLogger({
    format: combine(
      timestamp(), // Always add a timestamp to log messages
      json(), // Show log messages in JSON format
      errors({ stack: true }) // When Error objects are passed directly to a logger, show their stack traces
    ),
    defaultMeta: { service: serviceName },
    transports: [consoleTransport],
  });
}

module.exports = logger;
