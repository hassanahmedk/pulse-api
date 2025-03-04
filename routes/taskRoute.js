const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController.js');
const validateToken = require('../middlewares/validateToken.js');

// Routes for tasks
// TODO we can infact check the tasks which the user is trying to get belongs to the project that the user has access to
router.post('/', taskController.createTask);

// for kanban component
router.post('/getByProjectId/:id', taskController.getTasksByProjectId);
router.post('/updateTask', taskController.updateTask);
router.post('/delete', taskController.deleteTask);

router.post('/addBulk', taskController.createTaskBulk);
router.get('/', taskController.getAllTasks);
router.put('/:id', validateToken, taskController.updateTask);

module.exports = router;
