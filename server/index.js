const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/*
 * Agregamos un middleware al final despues
 * de haber declarado todas las rutas para
 * que si ninguna ruta coincide con la de la
 * petición Express ejecute este middleware
 * como última medida para que nosotros podamos
 * enviarle una respuesta personalizada al
 * usuario con el codigo HTTP 404 que
 * corresponde a recurso no encontrado y un
 * mensaje en formato JSON y esto finaliza la
 * petición
 */
app.use((req, res, next) => {
  res.status(404);
  res.json({
    message: 'Error. Route not found',
  });
});

module.exports = app;
