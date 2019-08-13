const router = require('express').Router();

const controller = require('./controller');
const tasksRouter = require('./../tasks/routes');

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
  .post(controller.create)
  .get(controller.all);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

/*
 * /api/users/:projectId/tasks/ POST - CREATE
 * /api/users/:projectId/tasks/ GET - READ ALL
 * /api/users/:projectId/tasks/:id GET - READ ONE
 * /api/users/:projectId/tasks/:id PUT - UPDATE
 * /api/users/:projectId/tasks/:id DELETE - DELETE
 */

router.use('/:projectId/tasks', tasksRouter);

module.exports = router;
