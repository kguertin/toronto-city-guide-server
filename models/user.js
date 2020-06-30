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
  schedules: {
    type: []
  }
})


module.exports = User = mongoose.model("user", userSchema);