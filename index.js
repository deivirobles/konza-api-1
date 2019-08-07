const http = require('http');

/*
 * Importar nuestra aplicación de Express y
 * el archivo de configuración
 */
const app = require('./server');
const config = require('./server/config');

/*
 * Extraemos la llave port del objeto server
 * en el objeto de la configuración
 */
const { port } = config.server;

/*
 * Reemplazamos el callback de la función
 * createServer con la aplicación de Express
 * ya que esta diseñada para ser compatible
 * pues sera la encargada de manejar todas
 * las peticiones que lleguen a nuestro
 * servidor Web
 */
const server = http.createServer(app);

/*
 * El encargado de iniciar el servidor Web es
 * el modulo http de Node.js
 */
server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
