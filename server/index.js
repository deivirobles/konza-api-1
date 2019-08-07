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
  /*
   * Ya que tenemos un middleware que maneja los
   * errores delegamos el manejo de este error a
   * el utilizando la función next y enviando
   * como parametro toda la descripción del error
   */
  next({
    message: 'Route not found',
    statusCode: 404,
    level: 'warn',
  });
});

// Error handler
app.use((err, req, res, next) => {
  /*
   * Actualizamos nuestro middleware de error para
   * que extraiga del objeto error el tipo de error
   * de la llave level, como este es un log creado
   * por el usuario y no una petición creamos el
   * mensaje utilizando la función header que
   * añadimos previamente en la variable log y esta
   * vez invocamos el logger con el level respectivo
   * y le pasamos como parametro el texto (log)
   */
  const { message, statusCode = 500, level = 'error' } = err;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  logger[level](log);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
