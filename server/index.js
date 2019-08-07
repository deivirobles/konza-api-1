const express = require('express');
const requestId = require('express-request-id')();

const logger = require('./config/logger');

const app = express();

// Setup Middleware
app.use(requestId);
app.use(logger.requests);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

// No route found handler
app.use((req, res, next) => {
  const message = 'Route not found';
  const statusCode = 404;

  logger.warn(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  logger.error(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
