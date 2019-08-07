/*
 * Modularizar la aplicación de Express
 * dejandole solo la responsabilidad de
 * manejar nuestra aplicación
 * independientemente del servidor Web
 * que la gestione
 */
const express = require('express');

/*
 * Inicializamos la aplicación de Express
 */
const app = express();

/*
 * Declaramos la ruta raiz / con el verbo
 * HTTP GET para cuando llegue la petición
 * ejecute el callback asociado con los
 * respectivos request (req) y response (res)
 * enviados por el servidor Web, dando como
 * respuesta y finalizando la petición con un
 * texto. A este callback Express lo llama
 * middleware
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
