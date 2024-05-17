const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Task Schema
const taskSchema = new Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  tags: {
    type: String,
  },
  assignee: String,
  projectId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
