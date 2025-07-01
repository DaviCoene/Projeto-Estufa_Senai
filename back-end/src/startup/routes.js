const express = require('express');
const sensor = require('../routes/sensor');
const monitor = require('../routes/monitor');
const sensor_log = require('../routes/sensor_log');
const monitor_log = require('../routes/monitor_log');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/sensor', sensor);
    app.use('/api/monitor', monitor);
    app.use('/api/sensor_log', sensor_log);
    app.use('/api/monitor_log', monitor_log);
}
