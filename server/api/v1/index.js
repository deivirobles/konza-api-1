/*
 * Obtenemos directamente el metodo Router
 * y lo ejecutamos para instanciarlo en la
 * variable router
 */

const router = require('express').Router();
/*
 * Utilizamos el objeto Router de Express
 * para definir rutas independientemente
 * el prefijo que se les establezca en este
 * caso en el archivo de la aplicación de
 * express se definio que se añada el prefijo
 * /api a este enrutador, por lo tanto la
 * ruta que esta definida hasta el momento
 * sera: /api/tasks
 */
router.route('/tasks').get((req, res, next) => {
  res.json({
    message: 'GET all tasks',
  });
});

/*
 * Convertimos este enrutador un modulo para
 * que pueda ser utilizado por cualquier otro
 * modulo dentro de la aplicación añadiendole
 * el prefijo que deseen
 */
module.exports = router;
