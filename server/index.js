const express = require('express');
const requestId = require('express-request-id')();

const logger = require('./config/logger');
/*
 * Actualizamos la ruta del enrutador pues
 * esta definiendo la version del API con
 * el directorio v1 creado
 */
const api = require('./api/v1');

const app = express();

// Setup Middleware
app.use(requestId);
app.use(logger.requests);

// Setup router and routes
/*
 * Es muy importante versionar el API para
 * evitar futuros inconvenientes con las
 * actualizaciones.
 * Es muy facil añadir otro prefijo a nuestro
 * enrutador ya que esa es la forma como el
 * funciona, ahora tenemos dos prefijos
 * independientes que esta enlazados al mismo
 * enrutador, lo cual es una ventaja enorme
 * al no tener que duplicar el codigo de todas
 * las rutas que definamos en el API
 */
app.use('/api', api);
app.use('/api/v1', api);

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
