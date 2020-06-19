const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth')

router.post('/getActiveUser', isAuth, userController.getUserToken)

router.post('/findUser', isAuth, userController.findUser)

router.post('/addContact', isAuth, userController.addContact)

module.exports = router