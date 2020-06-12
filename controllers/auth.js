const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.postLogin = (req, res) => {
  const {username, password} = req.body;

  User.findUser(username)
  .then(user => {
    return bcrypt.compare(password, user.password)
  })
  .then(validPass => {
    if (validPass) {
      console.log('Logged In');
    } else {
      console.log('Invalid Password');
    }
  })
  .catch(err => console.log(err));

  // create session and the so we can attach to req and handling using middleware
}

exports.postSignUp = async (req, res) => {
const {username, email, password, confirmPassword} = req.body
if (password !== confirmPassword) {
  //handle error
  res.status(422);
}
const hashedPassword = await bcrypt.hash(password, 12);
const user = new User(username, email, hashedPassword);
user.save();

// create session and the so we can attach to req and handling using middleware

res.sendStatus(200);
}