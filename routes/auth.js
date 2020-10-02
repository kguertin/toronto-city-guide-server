const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const authController = require('../controllers/auth');

router.post('/signup',[
    body('username')
    .trim()
    .isLength({min: 3}), 
    body('email')
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({min: 3}),
    body('confirmPassword')
    .trim()
    .isLength({min: 3})    
], authController.postSignUp);

router.post('/login', authController.postLogin);

router.post('/isTokenValid', authController.isTokenValid);

module.exports = router;