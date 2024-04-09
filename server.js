const express = require("express");
const app = express();
const connectDb = require("./db/connectDb");
const errorHandler = require("./middlewares/errorHandler");
const userRoute = require("./routes/userRoute");
const validateToken = require("./middlewares/validateToken");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
bodyParser = require("body-parser");
app.use(bodyParser.json());
const crypto = require("crypto");
const Start = async () => {
  app.listen(PORT, () => {
    console.log("server is listening at port ", PORT);
  });
  await connectDb(process.env.DATABASE_URL);
  console.log("successfully connected");
  // app.use(validateToken);
  app.use("/user", userRoute);
  app.use(errorHandler); // define below the routes
};
Start();
