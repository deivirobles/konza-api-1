const router = require('express').Router();

const controller = require('./controller');
const tasksRouter = require('./../tasks/routes');
const { auth } = require('./../auth');

/*
 * /api/tasks/ POST - CREATE
 * /api/tasks/ GET - READ ALL
 * /api/tasks/:id GET - READ ONE
 * /api/tasks/:id PUT - UPDATE
 * /api/tasks/:id DELETE - DELETE
 */

router.param('id', controller.id);

router
  .route('/')
  .post(auth, controller.create)
  .get(auth, controller.all);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, controller.update)
  .delete(auth, controller.delete);

/*
 * /api/users/:projectId/tasks/ POST - CREATE
 * /api/users/:projectId/tasks/ GET - READ ALL
 * /api/users/:projectId/tasks/:id GET - READ ONE
 * /api/users/:projectId/tasks/:id PUT - UPDATE
 * /api/users/:projectId/tasks/:id DELETE - DELETE
 */

router.use('/:projectId/tasks', tasksRouter);

module.exports = router;
