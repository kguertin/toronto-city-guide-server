const Schedule = require('../models/schedule');

exports.schedules = (req, res) => {
  const { scheduleData } = req.body;
  console.log("this", scheduleData)
  
}