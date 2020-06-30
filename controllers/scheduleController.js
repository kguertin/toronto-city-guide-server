const Schedule = require("../models/schedule");
const User = require("../models/user");
const moment = require("moment-timezone");
//const moment = require('moment');

exports.postSchedule = async (req, res) => {
  try {
    console.log("date in req:", req.body.bookedDate);
    // console.log('moment',moment(req.body.bookedDate).zone("America/Toronto").format("YYYY-MM-DD HH:mm"));
    console.log(
      "moment",
      moment.utc(req.body.bookedDate).utcOffset(-240).format("YYYY-MM-DD HH:mm")
    );
    const schedule = new Schedule({
      title: req.body.title,
      description: req.body.description,
      bookedDate: moment
        .utc(req.body.bookedDate)
        .utcOffset(-240)
        .format("YYYY-MM-DD HH:mm")

    });
    if (!req.body.title || !req.body.description) {
      res
        .status(400)
        .json({ msg: "Make sure title and description is filled" });
    }
    const savedSchedule = await schedule.save();
    const user = await User.findById(req.user);

    user["schedules"].push(savedSchedule._id);
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
  const { selectedDate } = req.body
  console.log(selectedDate)
  const schedules = await Schedule.find();
  let filtered = schedules.filter((i) => {
    return user["schedules"].includes(i._id);
  });
  // console.log(selectedDate)
  // const filteredagain = filtered.filter((i) => {
    // console.log("i", i.bookedDate)
    // return i.bookedDate.includes(selectedDate);
  // });
  // console.log("filteredddddddd", filteredagain)
  filtered = filtered.sort((a1, a2) => {
    return a1["bookedDate"].getTime() - a2["bookedDate"].getTime();
  });

  filtered = filtered.map((each) => {
    each["bookedDate"] = moment
      .utc(each["bookedDate"].toString());
      
    return each;
  });

  res.json({ msg: "Schedule Created", schedules: filtered });
};
