const express = require('express');
const app = express();
const connectDb = require('./db/connectDb');
const errorHandler = require('./middlewares/errorHandler');
const userRoute = require('./routes/userRoute');
const toolsRoute = require('./routes/toolsRoute');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Use environment variables
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not provided
const DATABASE_URL = process.env.DATABASE_URL;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/users', userRoute);
app.use('/tools', toolsRoute);

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDb(DATABASE_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server: ', error);
    process.exit(1); // Exit the process if server fails to start
  }
};
startServer();
