const router = require('express').Router();

const tasks = require('./tasks/routes');
const users = require('./users/routes');
const projects = require('./projects/routes');

router.use('/tasks', tasks);
router.use('/users', users);
router.use('/projects', projects);

module.exports = router;
