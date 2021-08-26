const express = require('express');

const {
    postItem,
    postAdd,
    postUploadTemp,
    postAddTemp,
    getByUser,
    deletePicTemp,
    deleteTempItem,
    publicTempItem,
    //getById,
    getTemp,
    deleteItem,
    patchItem,
} = require('./controller');

const carsRouter = express.Router();

carsRouter.post('/', postItem);
carsRouter.post('/add', postAdd);
carsRouter.post('/addTemp', postAddTemp);
carsRouter.get('/', getByUser);
carsRouter.get('/temp', getTemp);
carsRouter.post('/uploadTemp/:id', postUploadTemp);
carsRouter.post('/deletePicTemp/:id', deletePicTemp);
carsRouter.delete('/deleteTempItem/:id', deleteTempItem);
carsRouter.post('/publicTempItem/:id', publicTempItem);
//carsRouter.get('/:id', getById);
carsRouter.delete('/:id', deleteItem);
carsRouter.patch('/:id', patchItem);

module.exports = carsRouter;
