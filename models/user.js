const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    required: true 
  },
  password: {
    type: String,
    required: true
  }
})


module.exports = User = mongoose.model("user", userSchema);

//Things users need 
// favourited/tagged places however we want to track map pins 
// some relation to chat, maybe an external library handles this?
// schedule 
//