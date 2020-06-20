const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/scheduleController');

router.post('/schedules', scheduleController.schedules);

module.exports = router