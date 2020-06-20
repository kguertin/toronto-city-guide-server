const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/scheduleController');

router.post('/', scheduleController.postSchedule);
router.get('/', scheduleController.getSchedules);

module.exports = router



