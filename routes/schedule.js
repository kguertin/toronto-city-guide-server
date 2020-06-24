const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const scheduleController = require('../controllers/scheduleController');

router.post('/', isAuth, scheduleController.postSchedule);
router.get('/', isAuth, scheduleController.getSchedules);

module.exports = router



