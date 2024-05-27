const express = require('express');
const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let tokenValue = 'valuetoken';
const registerUser = asyncHandler(async (req, res) => {
  // const del = await userModel.deleteMany();
  // console.log(" del is " , del);
  let { email, password, name, profilePicture, phoneNumber } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    throw new Error('User already Exist!');
  }
  const hashedPassword = await bcrypt.hash(password, 10); //* 10 is salt round
  password = hashedPassword;
  const createdUser = await userModel.create({
    email,
    password,
    name,
    profilePicture,
    phoneNumber,
  });
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

  res.json({ success: true, message: 'Invite has been sent to the user' });
};

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
          id: userExist._id,
          password: userExist.password,
        },
      },
      process.env.SECRET_TOKEN_ACCESS,
      {
        expiresIn: '20d',
      },
    );
    // console.log(accessToken);
    res.json({ accessToken: accessToken, user: userExist });
  } else {
    throw new Error('Invalid email or password');
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
      expiresIn: '0s',
    },
  );
  res.json({ currentUser: req.user });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  let { name, role, phoneNumber, bio, location } = req.body;
  //first to check the email exist.
  let filter = { email: req.user.email };
  let update = { name, role, phoneNumber, bio, location };
  let updatedProfile = await userModel.findOneAndUpdate(filter, update, { new: true });
  updatedProfile.save();
  res.status(200).json({
    message: 'update user profile successfully',
    user: req.user,
    updatedProfile: updatedProfile,
  });
});

const updateUserPassword = asyncHandler(async (req, res) => {
  // let updatedPassword;
  let { newPassword, oldPassword } = req.body;
  //first check the old password from database.
  let response = await userModel.findOne({ email: req.user.email });
  let password = response.password;
  // bcrypt.compare(oldPassword, password, async (err, res) => {
  //   if (res) {
  //     let filter = { email: req.user.email };
  //     let update = { password: newPassword };
  //     let res = await userModel.findOneAndUpdate(filter, update);
  //     updatedPassword = res;
  //     // console.log('res is', updatedPassword);
  //   } else {
  //     throw new Error('oldPassword is invalid ');
  //   }
  // });

  let isCorrectPassword = await bcrypt.compare(oldPassword, password);

  console.log('is correct ', isCorrectPassword);
  console.log('user is ', req.user);
  if (isCorrectPassword) {
    let newHashedPassword = await bcrypt.hash(newPassword, 10);
    let filter = { email: req.user.email };
    let update = { password: newHashedPassword };
    let updatedPassword = await userModel.findOneAndUpdate(filter, update);
    console.log('updated passwprd is', updatedPassword);
    res.status(200).json({
      message: 'update user password successfully',
      user: req.user,
    });
  } else {
    throw new Error('old password must matched');
    res.status(500).json({
      message: 'An error occured',
    });
  }
});
//convert the hashedpassword to humna readable form.

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  logOut,
  getAllUsers,
  inviteUser,
  updateUserProfile,
  updateUserPassword,
};
