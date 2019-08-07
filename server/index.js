const express = require('express');
// Importamos el modulo de morgan
const morgan = require('morgan');

const logger = require('./config/logger');

const app = express();

/*
 * Morgan es un middleware que va a imprimir
 * cada una de las peticiones que reciba
 * nuestra aplicación, el formato seleccionado
 * es 'combined'
 */
app.use(morgan('combined'));

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
