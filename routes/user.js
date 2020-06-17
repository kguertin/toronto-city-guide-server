const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth')

router.post('/', isAuth, userController.getUser)

module.exports = router