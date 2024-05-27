const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
