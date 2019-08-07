const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const stripFinalNewline = require('strip-final-newline');

// Setup Logger with Winston
const logger = createLogger({
  format: format.simple(),
  transports: [new transports.Console()],
});

// Create Morgan id token
morgan.token('id', req => req.id);

// Setup request Format
const requestFormat = ':remote-addr [:date[iso]] :id ":method :url" :status';

// Setup Request Logger with Morgan
const requests = morgan(requestFormat, {
  stream: {
    write: (message) => {
      // Remove all line breaks
      const log = stripFinalNewline(message);
      return logger.info(log);
    },
  },
});

// Attach morgan to logger object
logger.requests = requests;

/*
 * Creamos una nueva funcion que recibe como
 * parametro el objeto req de la peticion y
 * extrae los mismos token que especificamos
 * en morgan para manejar el mismo encabezado
 * en el logger
 */
logger.header = (req) => {
  const date = new Date().toISOString();
  return `${req.ip} [${date}] ${req.id} "${req.method} ${req.originalUrl}"`;
};

module.exports = logger;
