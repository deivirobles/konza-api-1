const router = require('express').Router();

const tasks = require('./tasks/routes');

/*
 * Repetimos el mismo proceso que hicimos
 * al definir el prefijo (/api) para todas
 * las rutas de la aplicación, esta vez
 * definimos el prefijo /tasks para las
 * rutas que esten definidas en el enrutador
 * del recurso tasks en el archivo de routes
 * pero este a su vez tambien tiene el prefijo
 * definido en el archivo principal por lo
 * tanto las rutas se armar añadiendo todos
 * los prefijos, ej: (/api)(/tasks)(/) donde
 * los dos primeros grupos de parentesis son
 * los prefijos añadidos con el metodo use y
 * el ultimo esta definido en el enrutador
 * del recurso tasks en routes
 */
router.use('/tasks', tasks);

module.exports = router;
