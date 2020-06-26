const mongoose = require('mongoose');
//const moment = require('moment-timezone');
const scheduleSchema = new mongoose.Schema({
   id: {
     type: String,
     require: true
   },
   bookedDate: {
     type: Date,
     require: true
   },

   title: {
     type: String,
     require: true
    },

   description:{
     type: String
   }
   

})
const Schedule = mongoose.model("schedule",scheduleSchema);
module.exports = Schedule;



// date
// created time 
// title 
// description

