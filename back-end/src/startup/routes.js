const express = require('express');
const visu = require('../routes/visu');


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/visu', visu);
}