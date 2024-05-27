const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const {
  registerUser,
  loginUser,
  currentUser,
  getAllUsers,
  inviteUser,
  logOut,
  updateUserProfile,
  updateUserPassword,
} = require('../controller/userController');

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.get('/current', validateToken, currentUser);
router.post('/invite', inviteUser);
router.post('/logout', logOut);
router.post('/updateProfile', validateToken, updateUserProfile);
router.post('/updatePassword', validateToken, updateUserPassword);
// we want to add token
router.get('/getAllUsers', getAllUsers);

module.exports = router;
