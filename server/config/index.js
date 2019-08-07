/*
 * Cargamos el modulo que se encarga de
 * leer por defecto el archivo .env y
 * crear cada una de las variables de
 * entorno especificadas
 */
require('dotenv').config('');

/*
 * Podemos acceder a todos las variables
 * de entorno mediante el objeto env del
 * objeto process disponible en cualquier
 * lugar de la aplicación
 */
const config = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
};

module.exports = config;
