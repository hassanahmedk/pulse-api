const Reminder = require('../models/Reminder');

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addReminder = async (req, res) => {
  const reminder = new Reminder({
    title: req.body.title,
    task: req.body.task,
    date: req.body.date,
    time: req.body.time,
  });

  try {
    const newReminder = await reminder.save();
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reminder deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};