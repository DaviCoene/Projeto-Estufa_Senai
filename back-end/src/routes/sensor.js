const express = require('express');
const Sensor_Controller = require('../controller/Sensor_Controller');
const router = express.Router();
router

    .get('/', Sensor_Controller.getAllSensors)
    .get('/:id', Sensor_Controller.getById)
    .post('/', Sensor_Controller.create)
    .put('/:id', Sensor_Controller.updateByName)
    .delete('/:id', Sensor_Controller.deleteByName)

module.exports = router;