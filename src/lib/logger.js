const winston = require('winston');

const logger = winston.createLogger({
  transports: [],
});

if (!!process.env.LOG_CONSOLE) {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
    ),
  }));
}

if (!!process.env.LOG_FILE) {
  logger.add(new winston.transports.File({filename: process.env.LOG_FILE}));
}

module.exports = logger;
