const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const {
  registerUser,
  loginUser,
  currentUser,
  getAllUsers,
} = require('../controller/userController');

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.get('/current', validateToken, currentUser);
// we want to add token
router.get('/getAllUsers', getAllUsers);

module.exports = router;
