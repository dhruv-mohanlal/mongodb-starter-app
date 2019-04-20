const log4js = require('log4js');
const logger = log4js.getLogger();

const infoLogger = (uuid, method, message) => {
    return logger.info(`RequestCorrelationId='${uuid}' method='${method}' Message='${message}'`);
}

const errorLogger = (uuid, method, message) => {
    return logger.error(`RequestCorrelationId='${uuid}' method='${method}' Message='${message}'`);
}

module.exports = { infoLogger, errorLogger };