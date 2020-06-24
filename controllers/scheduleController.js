const Schedule = require("../models/schedule");
const User = require('../models/user');
const moment = require('moment-timezone');

exports.postSchedule = async (req, res) => {
  try {
    const schedule = new Schedule({
      title: req.body.title,
      description: req.body.description,
      bookedDate: moment(req.body.bookedDate).tz('America/Toronto').format("YYYY-MM-DD HH:mm")
      //req.body.bookedDate
    });
    if (!req.body.title || !req.body.description) {
      res
        .status(400)
        .json({ msg: "Make sure title and description is filled" });
    }
    const savedSchedule = await schedule.save();
    const user = await User.findById(req.user);
    console.log('savedobj',savedSchedule);
    console.log('');
    user['schedules'].push(savedSchedule._id);
    user.save();
    if (!savedSchedule) {
      res.status(401).json({ msg: "Please enter a valid username" });
    }
    res.json({ msg: "Schedule Created", schedule: savedSchedule });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getSchedules = async (req, res) => {
  const user = await User.findById(req.user);
  const schedules = await Schedule.find();
  let filtered = schedules.filter(i => {
    return user['schedules'].includes(i._id);
  })
  console.log("filtered", filtered);
  res.json({ msg: "Schedule Created", schedules: filtered });
};
