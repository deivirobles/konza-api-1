const express = require('express');

const app = express();

/*
 * Elegimos el formato JSON por defecto
 * para darle respuesta a todas las peticiones
 * del API
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
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

/*
 * Agregamos un middleware especial para el
 * manejo de errores emitidos por nosotros en
 * en el codigo fuente, este tiene una firma
 * diferente ya que como primer parametro tiene
 * el objeto error que como minimo tiene una
 * llave llamada message.
 * Extraemos las llaves necesarias y si no
 * existen le asignamos los valores por defecto
 * el codigo HTTP 500 corresponde a error interno
 * del servidor e igual que el anterior
 * middleware le damos respuesta al usuario
 * mensaje en formato JSON y esto finaliza la
 * peticion
 */
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
