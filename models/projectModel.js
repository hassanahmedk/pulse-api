const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project Schema
const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
      default: Date.now,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    lead: String,
  },
  { timestamps: true },
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
