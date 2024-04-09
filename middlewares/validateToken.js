const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validateToken = (req, res, next) => {
  console.log("validate Token");
  //   res.send("validate token ");
  const auth = req.headers.authentication || req.headers.Authentication;
  const checkBearer = auth.split(" ")[0];
  if (checkBearer == "Bearer" || checkBearer == "bearer") {
    console.log("bearer is exist lets process further");
  }
  const token = auth.split(" ")[1];
  console.log(auth.split(" ")[1]);
  jwt.verify(token, process.env.SECRET_TOKEN_ACCESS, (err, decode) => {
    if (err) {
      throw new Error("Invalid token or expires you might need to login again");
    }
    req.user = decode.user;
  });
  next();
};

module.exports = validateToken;
