const express = require('express');
const Visu_Controller = require('../controller/Visu_Controller');
const router = express.Router();
router

    .get('/', Visu_Controller.getAllPeople)
    .get('/:id', Visu_Controller.getById)
    .post('/', Visu_Controller.create)
    .put('/:id', Visu_Controller.updateById)
    .delete('/:id', Visu_Controller.deleteById)

module.exports = router;