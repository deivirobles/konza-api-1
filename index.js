const http = require('http');

const app = require('./server');
const config = require('./server/config');
const database = require('./server/database');

/*
 * Del modulo relacionado con la base de datos
 * utilizamos la función connect para
 * conectarnos a la base de datos, pasandole como
 * parametros el objeto de configuracion con los
 * valores relacionados de la base de datos y por
 * el momento no tenemos opciones adicionales asi
 * que el segundo parametro es un objeto vacio
 */
database.connect(config.database, {});

const { port } = config.server;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
