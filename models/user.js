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

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   resetToken: String,
//   resetTokenExpiration: Date,
//   cart: {
//     items: [{
//       productId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true
//       }
//     }]
//   }
// })


module.exports = User = mongoose.model("user", userSchema);

//Things users need 
// favourited/tagged places however we want to track map pins 
// some relation to chat, maybe an external library handles this?
// schedule 
//
// stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]