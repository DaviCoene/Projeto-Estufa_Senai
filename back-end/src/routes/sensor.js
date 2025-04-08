const express = require('express');
const SensorController = require('../controller/SensorController');
const router = express.Router();
router
    .get('/', SensorController.getAllPeople)
    .get('/:id', SensorController.getById)
    .post('/', SensorController.create)
    .put('/:id', SensorController.updateById)
    .delete('/:id', SensorController.deleteById)
module.exports = router;