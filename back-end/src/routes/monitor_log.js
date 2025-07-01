const express = require('express');
const Monitor_log_Controller = require('../controller/Monitor_log_Controller');
const router = express.Router();
router

    .get('/', Monitor_log_Controller.getAllMonitors)
    .get('/:id', Monitor_log_Controller.getById)

module.exports = router;
