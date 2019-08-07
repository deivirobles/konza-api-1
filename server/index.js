const express = require('express');
const requestId = require('express-request-id')();

const logger = require('./config/logger');
const api = require('./api');

const app = express();

// Setup Middleware
app.use(requestId);
app.use(logger.requests);

// Setup router and routes
/*
 * Utilizamos el metodo use para establecer
 * un prefijo en las rutas de la aplicación
 * en este caso /api y como segundo parametro
 * un enrutador en este caso el definido en
 * el archivo server/api/index.js
 */
app.use('/api', api);

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
