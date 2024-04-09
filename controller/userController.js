const express = require("express");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
let tokenValue = "valuetoken";
const registerUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    throw new Error("User already Exist!");
  }
  const hashedPassword = await bcrypt.hash(password, 10); //* 10 is salt round
  password = hashedPassword;
  const createdUser = await userModel.create({ email, password });
  console.log("user is created with ", createdUser);
  res.send(createdUser);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const userExist = await userModel.findOne({ email });
  console.log(email, password);
  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    // console.log({ password: password, hashedPassword: userExist.password });
    console.log("logged In");
    const accessToken = await jwt.sign(
      {
        user: {
          email: userExist.email,
        },
      },
      process.env.SECRET_TOKEN_ACCESS,
      {
        expiresIn: "20m",
      }
    );
    console.log(accessToken);
    res.json({ accessToken: accessToken });
  } else {
    throw new Error("Invalid email or password");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  console.log("current user");
  res.json({ currentUser: req.user });
});

module.exports = { registerUser, loginUser, currentUser };
