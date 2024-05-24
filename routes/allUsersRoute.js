const express  = require("express")
const router = express.Router();
const validateToken = require("../middlewares/validateToken")
const {getAllUsers} = require("../controller/allUsersControllers")
router.get('/',validateToken , getAllUsers)
module.exports = router