const process = require('process');
const { createLogger, format, transports } = require('winston');
const { combine, json, timestamp, errors } = format;

const consoleTransport = new transports.Console({
  level: process.env.LOG_LEVEL || 'debug',
});

function logger(serviceName)
{
  return createLogger({
    format: combine(
      // Always add a timestamp to log messages
      timestamp(),
      // Show log messages in JSON format
      json(),
      // When Errors are passed directly to a logger, show their stack traces
      // (if you pass an Error object as a meta field to a logger, you still
      // won't get stack traces), this is only for passing directly to a logger
      errors({ stack: true })
    ),
    defaultMeta: { service: serviceName },
    transports: [consoleTransport],
  });
}

module.exports = logger;
