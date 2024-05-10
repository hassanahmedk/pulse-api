const express = require('express');
const { getSummary } = require('../controller/toolsController');
const router = express.Router();

router.route('/summary').post(getSummary);
module.exports = router;
