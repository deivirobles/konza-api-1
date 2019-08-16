const router = require('express').Router();

const controller = require('./controller');
const tasksRouter = require('./../tasks/routes');
const { auth, me } = require('./../auth');
const { sanitizers } = require('./model');

/*
 * /api/tasks/ POST - CREATE
 * /api/tasks/ GET - READ ALL
 * /api/tasks/:id GET - READ ONE
 * /api/tasks/:id PUT - UPDATE
 * /api/tasks/:id DELETE - DELETE
 */

router.param('id', controller.id);

router.route('/signup').post(sanitizers, controller.signup);
router.route('/signin').post(sanitizers, controller.signin);

router.route('/').get(auth, controller.all);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, me, sanitizers, controller.update)
  .delete(auth, me, controller.delete);

/*
 * /api/users/:userId/tasks/ POST - CREATE
 * /api/users/:userId/tasks/ GET - READ ALL
 * /api/users/:userId/tasks/:id GET - READ ONE
 * /api/users/:userId/tasks/:id PUT - UPDATE
 * /api/users/:userId/tasks/:id DELETE - DELETE
 */

router.use('/:userId/tasks', tasksRouter);

module.exports = router;
