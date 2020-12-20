const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.simple(),
      ),
    })],
});

if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({filename: 'combined.log'}));
}

module.exports = logger;
