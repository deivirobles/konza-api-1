const express = require('express');
const requestId = require('express-request-id')();
const bodyParser = require('body-parser');

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

/*
 * Utilizamos el modulo de body Parser para que
 * procese los datos que son enviados por
 * formualrios en la peticion u objetos JSON
 * este creara un objeto llamado body donde cada
 * llave corresponde al campo enviado con su
 * respectivo valor, para el caso de JSON es un
 * objeto literal de JavaScript
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Setup router and routes
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
