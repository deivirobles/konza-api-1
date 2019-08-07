const router = require('express').Router();

/*
 * /api/tasks/ POST - CREATE
 * /api/tasks/ GET - READ ALL
 * /api/tasks/:id GET - READ ONE
 * /api/tasks/:id PUT - UPDATE
 * /api/tasks/:id DELETE - DELETE
 */

/*
 * Definimos todas las rutas para el recurso
 * de tasks basado en el contrato de REST
 * API utilizando el Router y el metodo
 * route con los verbos HTTP y middlewares
 * correspondientes
 */
router
  .route('/')
  .post((req, res, next) => {})
  .get((req, res, next) => {});

/*
 * Las rutas de express permiten crear
 * parametros dinamicos utilizando los dos
 * puntos (:) seguido del nombre del
 * parametro, es decir que todo lo que este
 * despues del slash (/) se convierte en
 * el valor del parametro id y es una cadena
 */
router
  .route('/:id')
  .get((req, res, next) => {})
  .put((req, res, next) => {})
  .delete((req, res, next) => {});

module.exports = router;
