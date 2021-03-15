const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const { NOT_FOUND } = require('http-status');
const routes = require('./routes');
const ApplicationError = require('./utils/ApplicationError');
const { startJob } = require('./utils/cronHelper');
const { consumeNewsletterQueue, consumeRetryNewsletterQueue } = require('./utils/mqHelper');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
// require('./services/jobService').start();

// api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApplicationError(NOT_FOUND, req.t('NOT_FOUND')));
});


// Poll every 5 sec
startJob('*/5 * * * * *', consumeNewsletterQueue)
startJob('*/5 * * * * *', consumeRetryNewsletterQueue)


module.exports = app;
