const express = require('express');
const Visu_Controller = require('../controller/Visu_Controller');
const router = express.Router();
router

    .get('/', Visu_Controller.getAllPeople)
    .get('/latest', Visu_Controller.latestData)
    .post('/', Visu_Controller.create)
    .put('/:id', Visu_Controller.updateById)
    .delete('/:id', Visu_Controller.deleteById)

module.exports = router;