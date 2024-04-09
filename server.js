const express = require("express");
const app = express();
const connectDb = require("./db/connectDb");
const errorHandler = require("./middlewares/errorHandler");
const userRoute = require("./routes/userRoute");
require("dotenv").config();
const bodyParser = require("body-parser");

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(express.json());
app.use(bodyParser.json());

const Start = async () => {
  app.use("/user", userRoute);
  app.use(errorHandler); // define below the routes
  app.listen(PORT, () => {
    console.log("server is listening at port ", PORT);
  });
  await connectDb(DATABASE_URL);

  // app.use(validateToken);
};
Start();
