const mongoose = require('mongoose');
const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('database is connected with host ', mongoose.connection.host);
  } catch (err) {
    console.log('Error in the connection ', err);
  }
};

module.exports = connectDb;
