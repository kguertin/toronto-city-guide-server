const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')

const User = require('../models/user');

exports.postLogin = async (req, res, next) => {
  try {
    const {username, password} = req.body;
  
    const user = await User.findOne({username: username});

    if (!user) {
      const error = new Error('Please enter a valid username');
      error.statusCode = 401;
      throw error;
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      const error = new Error("Please enter a valid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.status(200).json({token, user: {
        id: user._id,
        username: user.username,
        email: user.email 
    }});
    
  } catch (err) {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.postSignUp = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    throw error;
  }
  try {
    const {username, email, password, confirmPassword} = req.body

    if (password !== confirmPassword) {
      const error = new Error('The passwords must match');
      error.statusCode = 400;
      throw error;
    }
    
    const existingUser =  await User.findOne({ username: username })
    if (existingUser) {
      const error = new Error('An account with this user name already exists.');
      error.statusCode = 400;
      throw error;
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username, 
      email, 
      password: hashedPassword});
    const savedUser = await user.save();
    
    res.status(201).json({msg: 'User created, please login', user: savedUser});
  } catch (err) {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.isTokenValid = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if(!token){
      const error = new Error('No token found');
      error.statusCode = 400;
      throw error;
    }

    const varified = jwt.verify(token, process.env.JWT_SECRET);
    if (!varified){
      const error = new Error('Token could not be varified');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(varified.id);
    if (!user) {
      const error = new Error('No user found with matching token');
      error.statusCode = 400;
      throw error;
    };

    res.status(200).json(true);

  } catch (err) {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  }
}