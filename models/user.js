const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: []
  },
  favourites: {
    type: []
  },
  schedules: [
    {type: Schema.Types.ObjectId, 
      ref: 'Schedule'}
    ]
})


module.exports = User = mongoose.model("user", userSchema);

//Things users need 
// favourited/tagged places however we want to track map pins 
// some relation to chat, maybe an external library handles this?
// schedule 
//
