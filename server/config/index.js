require('dotenv').config('');

/*
 * Agregamos una nueva llave que contendra todos
 * los valores asociados a la base de datos y
 * estos a su vez los tomamos de las variables de
 * entorno creadas desde el archivo .env
 * Es muy importante proteger los datos sensibles
 * que no queden guardados en el codigo fuente
 */

const config = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  database: {
    protocol: process.env.DATABASE_PROTOCOL,
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
};

module.exports = config;
