const winston = require('winston');
const { env, transports, log } = require('../config/credentials');

module.exports = winston.createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'api' },
  transports: [
    ...(transports.file) ? [
      new winston.transports.File({
        filename: log.logFile,
        level: transports.logLevel,
        tailable: true,
        maxsize: log.maxSize,
        maxFiles: log.maxFiles,
        zippedArchive: log.zip,
        silent: log.silent,
      }),
      new winston.transports.File({
        filename: log.errorLogFile,
        level: 'error',
        tailable: true,
        maxsize: log.maxSize,
        maxFiles: log.maxFiles,
        zippedArchive: log.zip,
        silent: log.silent,
      }),
    ] : [],
    ...(transports.console) ? [
      new winston.transports.Console({
        level: 'info',
        silent: log.silent,
      }),
    ] : [],
  ],
});
