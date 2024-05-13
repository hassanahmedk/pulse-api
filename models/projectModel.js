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
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
