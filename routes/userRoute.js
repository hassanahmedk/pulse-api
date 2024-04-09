const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controller/userController");

router.route("/signin").post(registerUser);
router.route("/login").post(loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
