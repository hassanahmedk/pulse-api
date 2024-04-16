const express = require('express');
const CONSTANTS = require('../constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  console.log('in the error handler');
  switch (statusCode) {
    case CONSTANTS.UNAUTHORIZED_ACCESS:
      res.json({
        message: err.message,
        title: 'UNAUTHORIZED_ACCESS',
        // stackTrace: err.stack,
      });
      break;
    case CONSTANTS.RESOURCE_NOT_FOUND:
      res.json({
        message: err.message,
        title: 'RESOURCE_NOT_FOUND',
        // stackTrace: err.stack,
      });
    case CONSTANTS.INTERNAL_SERVER_ERROR:
      res.json({
        message: err.message,
        title: 'INTERNAL_SERVER_ERROR',
        // stackTrace: err.stack,
      });
    case CONSTANTS.RATE_LIMIT_EXCEEDED:
      res.json({
        message: err.message,
        title: 'RATE_LIMIT_EXCEEDED',
        // stackTrace: err.stack,
      });
    case CONSTANTS.VALIDATION_ERROR:
      res.json({
        message: err.message,
        title: 'VALIDATION_ERROR',
        // stackTrace: err.stack,
      });
    case CONSTANTS.FORBIDDEN:
      res.json({
        message: err.message,
        title: 'FORBIDDEN',
        // stackTrace: err.stack,
      });

    default:
      res.json({
        error: 'Oops something went wrong.',
        message: err.message,
      });
      break;
  }
  //!   next()
};

module.exports = errorHandler;
