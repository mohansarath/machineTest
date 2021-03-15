const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
if (fs.existsSync(path.resolve(__dirname, `../../${envFile}`))) {
  const config = dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });
  if (config.error) {
    throw new Error(config.error);
  }
}

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dbOptions: process.env.DB_OPTIONS || 'retryWrites=true&w=majority',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  transports: {
    file: process.env.LOG_TO_FILE,
    console: process.env.LOG_TO_CONSOLE,
  },
  log: {
    maxSize: process.env.LOG_MAX_BYTES || 104857600,
    maxFiles: process.env.LOG_MAX_FILES || 10,
    zip: process.env.LOG_ZIPPED || true,
    logFile: process.env.LOG_FILE || './logs/combined.log',
    errorLogFile: process.env.ERROR_LOG_FILE || './logs/error.log',
    silent: (process.env.NODE_ENV === 'test') ? true : process.env.LOG_SILENT || false,
  },
};
