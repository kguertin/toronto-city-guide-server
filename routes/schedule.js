const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const scheduleController = require('../controllers/scheduleController');

router.post('/post', isAuth, scheduleController.postSchedule);
router.post('/get', isAuth, scheduleController.getSchedules);
router.delete('/deleteItem', isAuth, scheduleController.deleteItem);

module.exports = router



