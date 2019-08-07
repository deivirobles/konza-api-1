const express = require('express');
const requestId = require('express-request-id')();

const logger = require('./config/logger');

const app = express();

// Setup Middleware
app.use(requestId);
app.use(logger.requests);

// Routes
/*
 * Definimos nuestra primera ruta /api/tasks
 * que sera accedida con el verbo GET la cual
 * en el contrato REST corresponde al listado
 * del recurso tasks
 */
app.get('/api/tasks', (req, res, next) => {
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
