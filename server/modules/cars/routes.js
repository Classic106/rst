const express = require('express');

const carsController = require('./controller');

const carsRouter = express.Router();

//carsRouter.get('/', ()=>{}/*carsController.post*/);
carsRouter.post('/', carsController.post);
carsRouter.post('/add', carsController.postAdd);
carsRouter.get('/:id', carsController.getById);
carsRouter.delete('/:id', carsController.delete);
carsRouter.patch('/:id', carsController.patch);

module.exports = carsRouter;
