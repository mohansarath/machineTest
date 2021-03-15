const mongoose = require('mongoose');
const app = require('./app');
const { database, port } = require('./config/credentials');
const logger = require('./utils/logHelper');

let server;
url = `mongodb+srv://${database.username}:${database.password}@${database.host}/${database.dbName}?${database.dbOptions}`;


mongoose.connect(url, database.options).then(() => {
  logger.info('Successfully connected to MongoDB');
  server = app.listen(port, () => {
    logger.info(`Listening to port ${port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  console.log(error);
  exitHandler();
};

// Function to gracefully close mongoose connection
const gracefullyCloseConnection = async () => {
  mongoose.connection.close(() => {
    logger.info('MongoDB connection is closed');
    process.exit(0);
  });
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', gracefullyCloseConnection);
process.on('SIGINT', gracefullyCloseConnection);
