const Schedule = require("../models/schedule");

exports.postSchedule = async (req, res) => {
  try {
    const schedule = new Schedule({
      title: req.body.title,
      description: req.body.description,
      bookedDate: req.body.bookedDate,
    });
    if (!req.body.title || !req.body.description) {
      res
        .status(400)
        .json({ msg: "Make sure title and description is filled" });
    }
    const savedSchedule = await schedule.save();
    if (!savedSchedule) {
      res.status(401).json({ msg: "Please enter a valid username" });
    }
    res.json({ msg: "Schedule Created", schedule: savedSchedule });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getSchedules = async (req, res) => {
  const schedules = await Schedule.find();
  res.json({ msg: "Schedule Created", schedules: schedules });
};
