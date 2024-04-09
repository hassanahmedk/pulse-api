const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controller/userController");
const validateToken = require("../middlewares/validateToken");

router.route("/signin").post(registerUser);
router.route("/login").post(loginUser);
// router.post("/signin", registerUser);
// router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
