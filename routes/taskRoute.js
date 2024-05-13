const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController.js');
const validateToken = require('../middlewares/validateToken.js');

// Routes for tasks
// TODO we can infact check the tasks which the user is trying to get belongs to the project that the user has access to
router.post('/', validateToken, taskController.createTask);
router.get('/', validateToken, taskController.getAllTasks);
router.get('/:id', validateToken, taskController.getTaskById);
router.put('/:id', validateToken, taskController.updateTask);
router.delete('/:id', validateToken, taskController.deleteTask);

module.exports = router;
