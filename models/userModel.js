const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email must required'],
    },
    password: {
      type: String,
      required: [true, ' please add the user password '],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
