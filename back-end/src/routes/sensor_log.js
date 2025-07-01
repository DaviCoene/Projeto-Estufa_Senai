const express = require('express');
const Monitor_log_Controller = require('../controller/Sensor_log_Controller');
const router = express.Router();
router

    .get('/', Sensor_log_Controller.getAllSensors)
    .get('/:id', Sensor_log_Controller.getById)

module.exports = router;
