const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

router.get('/reminders', reminderController.getReminders);
router.post('/reminders', reminderController.addReminder);
router.delete('/reminders/:id', reminderController.deleteReminder);

module.exports = router;