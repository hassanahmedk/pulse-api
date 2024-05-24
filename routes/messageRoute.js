const express = require("express");
const router = express.Router();

const validateToken = require("../middlewares/validateToken");
const {sendMessage, getMessage} = require('../controller/messageController')

router.post("/send/:id",validateToken ,sendMessage);
router.get("/:id",validateToken ,getMessage);

module.exports = router;