const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const authController = require('../controllers/auth');

router.post('/login',[
    body('username')
        .not().isEmpty()
        .trim()
        .isLength({min: 3}),
    body('password')
        .not().isEmpty()
        .trim()
        .isLength({min: 3})
], authController.postLogin);

router.post('/signup',[
    body('username')
        .not().isEmpty()
        .trim()
        .isLength({min: 3}), 
    body('email')
        .not().isEmpty()
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password')
        .not().isEmpty()
        .trim()
        .isLength({min: 3}),
    body('confirmPassword')
        .not().isEmpty()
        .trim()
        .isLength({min: 3})    
], authController.postSignUp);

router.post('/isTokenValid', authController.isTokenValid);

module.exports = router;