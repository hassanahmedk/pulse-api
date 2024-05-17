const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController.js');
const validateToken = require('../middlewares/validateToken.js');

// Routes for projects
router.post('/', validateToken, projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', validateToken, projectController.getProjectById);
router.put('/:id', validateToken, projectController.updateProject);
router.delete('/:id', validateToken, projectController.deleteProject);
router.post('/:id/add-user', validateToken, projectController.addUserToProject);

module.exports = router;
