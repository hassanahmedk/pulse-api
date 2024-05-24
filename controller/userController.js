const express = require("express");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let tokenValue = "valuetoken";
const registerUser = asyncHandler(async (req, res) => {
  // const del = await userModel.deleteMany();
  // console.log(" del is " , del);
  let { email, password, name, profilePicture, phoneNumber } = req.body;
  
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    throw new Error("User already Exist!");
  }
  const hashedPassword = await bcrypt.hash(password, 10); //* 10 is salt round
  password = hashedPassword;
  const createdUser = await userModel.create({ email, password ,  name, profilePicture, phoneNumber });
  // console.log("user is created with ", createdUser);
  // res.send(createdUser)
  res.send(createdUser);
});

const getAllUsers = async (req, res) => {
  let users = await userModel.find({});
  res.json({ users });
};

const inviteUser = async (req, res) => {
  const email = req.body.userEmail;

  res.json({success:true, message:'Invite has been sent to the user'})
}

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const userExist = await userModel.findOne({ email });
  // console.log(email, password);
  // console.log("userExist is " , userExist);
  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    const accessToken = await jwt.sign(
      {
        user: {
          email: userExist.email,
          id : userExist._id,
          password: userExist.password
        },
      },
      process.env.SECRET_TOKEN_ACCESS,
      {
        expiresIn: "20d",
      }
    );
    // console.log(accessToken);
    res.json({ accessToken: accessToken , "user" :userExist });
  } else {
    throw new Error("Invalid email or password");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  // console.log("current user");
  res.json({ currentUser: req.user });
});

const logOut = asyncHandler(async (req, res) => {
  // console.log("Logout");
  const accessToken = await jwt.sign(
    {
      user: {
        email: req.body.email,
      },
    },
    process.env.SECRET_TOKEN_ACCESS,
    {
      expiresIn: "0s",
    }
  );
  res.json({ currentUser: req.user });
});
module.exports = { registerUser, loginUser, currentUser ,logOut, getAllUsers, inviteUser };
