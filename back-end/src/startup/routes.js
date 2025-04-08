const express = require('express');
const sensor = require('../routes/sensor');


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/sensor', sensor);
}