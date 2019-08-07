/*
 * Extraemos del modulo de Winston solo las
 * funciones que necesitamos
 */
const { createLogger, format, transports } = require('winston');

/*
 * Inicializamos el logger con el formato simple
 * y que la salida sea la consola
 */
const logger = createLogger({
  format: format.simple(),
  transports: [new transports.Console()],
});

module.exports = logger;
