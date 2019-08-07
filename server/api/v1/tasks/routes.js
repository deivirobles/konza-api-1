const router = require('express').Router();

/*
 * Repetimos el mismo proceso esta vez para
 * las rutas del recurso tasks, es decir,
 * creamos un nuevo enrutador que manejara
 * las rutas de este recurso independientemente
 * el prefijo que se le asigne
 */
router.get('/', (req, res, next) => {
  res.json({
    message: 'Get all tasks',
  });
});

module.exports = router;
