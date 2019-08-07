const express = require('express');
const morgan = require('morgan');

const logger = require('./config/logger');

const app = express();

/*
 * Redirigimos la salida de morgan que por
 * defecto es la consola a logger, asi queda
 * centralizada la gestion de los logs por un
 * solo manejador
 */
app.use(morgan('combined', { stream: { write: message => logger.info(message) } }));

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
