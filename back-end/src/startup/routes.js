const express = require('express');
const sensor = require('../routes/sensor');
const monitor = require('../routes/monitor');


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/sensor', sensor);
    app.use('/api/monitor', monitor);
}