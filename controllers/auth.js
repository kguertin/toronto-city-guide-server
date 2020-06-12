const User = require('../models/user')

exports.postLogin = (req, res) => {
  const {username, password} = req.body;

  User.findUser(username)
  .then(user => {
    if (user.password === password) {
      console.log(user)
    } else {
      console.log('invalid password');
    }
  })
  .catch(err => console.log(err));
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