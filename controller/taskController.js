const Task = require('../models/taskModel.js');

// Controller for handling CRUD operations on tasks
const taskController = {
  // Create a new task
  createTask: async (req, res) => {
    try {
      const newTask = await Task.create(req.body);
      res.status(201).json({success:true, newTask});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTaskBulk: async (req, res) => {
    try {
      // receives an array
      const tasks = req.body.tasks;
      const createdTasks = await Task.insertMany(tasks);
      res.status(201).json(createdTasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get tasks by project ID
  getTasksByProjectId: async (req, res) => {
    try {
      const task = await Task.find({ projectId: req.params.id });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a task by ID
  updateTask: async (req, res) => {
    let updatedTaskBody = req.body.value;
    let id = updatedTaskBody._id;
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, updatedTaskBody, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a task by ID
  deleteTask: async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.body.key);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = taskController;
