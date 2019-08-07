const express = require('express');
const requestId = require('express-request-id')();

const logger = require('./config/logger');

const app = express();

// Setup Middleware
app.use(requestId);
app.use(logger.requests);

// Routes
/*
 * Introducimos el metodo route que nos permite
 * organizar las rutas esta vez dividiendo la
 * ruta como parametro del metodo y añadidos por
 * punto todos los verbos HTTP con sus
 * respectivos callbacks en este caso solo get
 */
app.route('/api/tasks').get((req, res, next) => {
  res.json({
    message: 'GET all tasks',
  });
});

// No route found handler
app.use((req, res, next) => {
  next({
    message: 'Route not found',
    statusCode: 404,
    level: 'warn',
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { message, statusCode = 500, level = 'error' } = err;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  logger[level](log);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
