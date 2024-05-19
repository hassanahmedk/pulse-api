const express = require('express');
const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
let tokenValue = 'valuetoken';

const registerUser = asyncHandler(async (req, res) => {
  let { email, password, name, profilePicture, phoneNumber } = req.body;
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    throw new Error('USER_EXISTS');
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
  console.log('user is created with ', createdUser);
  res.send({ status: 200, message: 'User created successfully.' });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await userModel.findOne({ email });
  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: userExist.email,
        },
      },
      process.env.SECRET_TOKEN_ACCESS,
      {
        expiresIn: '1d',
      },
    );
    res.json({ success: true, accessToken });
  } else {
    throw new Error('INVALID_INFO');
  }
});

const currentUser = asyncHandler(async (req, res) => {
  console.log('current user');
  res.json({ currentUser: req.user });
});

const getAllUsers = async (req, res) => {
  let users = await userModel.find({});
  res.json({ users });
};

const inviteUser = async (req, res) => {
  const email = req.body.userEmail;

  res.json({success:true, message:'Invite has been sent to the user'})
}

module.exports = { registerUser, loginUser, currentUser, getAllUsers, inviteUser };
