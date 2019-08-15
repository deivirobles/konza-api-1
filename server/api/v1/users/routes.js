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

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.route('/').get(auth, controller.all);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, controller.update)
  .delete(auth, controller.delete);

/*
 * /api/users/:userId/tasks/ POST - CREATE
 * /api/users/:userId/tasks/ GET - READ ALL
 * /api/users/:userId/tasks/:id GET - READ ONE
 * /api/users/:userId/tasks/:id PUT - UPDATE
 * /api/users/:userId/tasks/:id DELETE - DELETE
 */

router.use('/:userId/tasks', tasksRouter);

module.exports = router;
