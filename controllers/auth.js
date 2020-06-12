const User = require('../models/user')

exports.postLogin = (req, res) => {
  
}

exports.postSignUp = (req, res) => {
const {username, email, password, confirmPassword} = req.body
if (password !== confirmPassword) {
  //handle error
  res.status(422);
}

const user = new User(username, email, password);
user.save();

res.sendStatus(200);
}