/*
 * Movemos morgan al archivo de logger
 * Requerimos el modulo que nos ayudara
 * a quitar el fin de linea que deja
 * por defecto morgan
 */
const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const stripFinalNewline = require('strip-final-newline');

// Setup Logger with Winston
const logger = createLogger({
  format: format.simple(),
  transports: [new transports.Console()],
});

/*
 * Creamos un nuevo token para morgan a partir
 * de la llave que creo request id en en el
 * objeto request, y asi poder incluirla en el
 * formato que generaremos de la peticion
 */
morgan.token('id', req => req.id);

/*
 * Declaramos el nuevo formato que utilizará
 * morgan para imprimir las peticiones, esta
 * vez incluimos el id y cambiamos la fecha
 * en el formato ISO
 */
const requestFormat = ':remote-addr [:date[iso]] :id ":method :url" :status';

/*
 * Creamos un nuevo objeto llamado requests
 * con el objetivo de instanciar morgan con
 * toda la configuracion del nuevo formato.
 * Adicionalmente en la función write que
 * redireccionamos a logger quitamos el fin
 * de linea de la salida
 */
const requests = morgan(requestFormat, {
  stream: {
    write: (message) => {
      // Remove all line breaks
      const log = stripFinalNewline(message);
      return logger.info(log);
    },
  },
});

/*
 * Guardamos dentro del objeto logger una llave
 * con el mismo nombre del objeto que creamos
 * para morgan, esto con el objetivo de exportar
 * un solo objeto que se encargue de todo lo
 * relacionado con los logs, ya sean emitidos
 * por el usuario o peticiones entrantes
 */
logger.requests = requests;

module.exports = logger;
