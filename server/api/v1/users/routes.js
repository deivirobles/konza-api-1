const router = require('express').Router();
const controller = require('./controller');
/*
 * /api/tasks/ POST - CREATE
 * /api/tasks/ GET - READ ALL
 * /api/tasks/:id GET - READ ONE
 * /api/tasks/:id PUT - UPDATE
 * /api/tasks/:id DELETE - DELETE
 */

/*
 * Para buscar, editar y eliminar una tarea
 * lo primero que tenemos que hacer es buscarla
 * para no repetir el mismo codigo que
 * escribimos en el middleware de read, para ello
 * express ofrece una funcionalidad en el router
 * llamada param que permite asociar un middleware
 * cada vez que exista un parametro dinamico en la
 * definicion de la ruta como primer parametro de
 * la funcion y como segundo parametro el callback
 * que se ejecutara, es muy importante mencionar
 * que este callback se ejecutara antes del
 * asociado previamente a la ruta es decir que
 * debemos hacer un next para que finalmente llegue
 * al middleware asociado por ejemplo controller.read
 */

router.param('id', controller.id);

router
  .route('/')
  .post(controller.create)
  .get(controller.all);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
