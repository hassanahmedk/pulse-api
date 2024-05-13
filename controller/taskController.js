const Task = require('../models/taskModel.js');

// Controller for handling CRUD operations on tasks
const taskController = {
  // Create a new task
  createTask: async (req, res) => {
    try {
      const newTask = await Task.create(req.body);
      res.status(201).json(newTask);
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

  // Get a single task by ID
  getTaskById: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
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
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
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
