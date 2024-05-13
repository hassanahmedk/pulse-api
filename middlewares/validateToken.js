const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_ACCESS);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = validateToken;
