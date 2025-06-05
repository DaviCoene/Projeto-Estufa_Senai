const express = require('express');
const Monitor_Controller = require('../controller/Monitor_Controller');
const router = express.Router();
router

    .get('/', Monitor_Controller.getAllMonitors)
    .get('/:id', Monitor_Controller.getById)
    .post('/', Monitor_Controller.create)
    .put('/:id', Monitor_Controller.updateByName)
    .delete('/:id', Monitor_Controller.deleteByName)

module.exports = router;