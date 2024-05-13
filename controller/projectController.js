const Project = require('../models/projectModel.js');

// Controller for handling CRUD operations on projects
const projectController = {
  // Create a new project
  createProject: async (req, res) => {
    try {
      const newProject = await Project.create(req.body);
      res.status(201).json({ success: true, message: 'Project created successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single project by ID
  getProjectById: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a project by ID
  updateProject: async (req, res) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a project by ID
  deleteProject: async (req, res) => {
    try {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addUserToProject: async (req, res) => {
    const projectId = req.params.id;
    const { userId } = req.body;

    try {
      // Check if the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Add the user to the project's users array
      project.users.push(userId);
      await project.save();

      res.status(200).json({ message: 'User added to project successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = projectController;
