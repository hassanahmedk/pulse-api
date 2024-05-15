const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController.js');
const validateToken = require('../middlewares/validateToken.js');

// Routes for tasks
// TODO we can infact check the tasks which the user is trying to get belongs to the project that the user has access to
router.post('/', validateToken, taskController.createTask);

// for kanban component
router.post('/getByProjectId/:id', taskController.getTasksByProjectId);
router.post('/updateTask', taskController.updateTask);

router.post('/addBulk', taskController.createTaskBulk);
router.get('/', validateToken, taskController.getAllTasks);
router.put('/:id', validateToken, taskController.updateTask);
router.delete('/:id', validateToken, taskController.deleteTask);

module.exports = router;
