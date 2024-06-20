const {requireEnvironmentVariable} = require('./src/environmentVariables');
const NRDB = require('./src/nrdb');
const testUtils = require('./src/test-util');
const timeUtils = require('./src/time');
const logger = require("./src/logger");

function configure({
    serviceName
    }) 
{
    logger.setServiceName(serviceName);

    return {
        requireEnvironmentVariable,
        NRDB,
        logger,
        testUtils,
        timeUtils
    }
}

module.exports = configure;