const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth')

router.get('/', isAuth, userController.getUser)

module.exports = router