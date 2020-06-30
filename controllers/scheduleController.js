const Schedule = require("../models/schedule");
const User = require("../models/user");
const moment = require("moment-timezone");
//const moment = require('moment');

exports.postSchedule = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      res
        .status(400)
        .json({ msg: "Make sure title and description is filled" });
    }

    const user = await User.findById(req.user);
    const newSchedule = {
          title: req.body.title,
          description: req.body.description,
          bookedDate: moment
            .utc(req.body.bookedDate)
            .utcOffset(-240)
            .format("YYYY-MM-DD HH:mm")
        }
        user.schedules.push(newSchedule)
        user.save();
    res.status(200).json({ msg: "Schedule Created", schedule: user.schedules });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const { selectedDate } = req.body
    
    const filteredSchedule = user.schedules.filter(schedule => {
      if(schedule.bookedDate.includes(selectedDate)){
        return schedule
      }
    })
  
    res.status(200).json({ msg: "Schedule Created", schedules: filteredSchedule });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};