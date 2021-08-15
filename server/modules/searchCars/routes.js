const express = require('express');

const SearchItemsController = require('./controller');

const SearchItemsRouter = express.Router();

SearchItemsRouter.get('/', SearchItemsController.get);
SearchItemsRouter.post('/', SearchItemsController.post);
SearchItemsRouter.delete('/:id', SearchItemsController.delete);
SearchItemsRouter.patch('/:id', SearchItemsController.patch);

module.exports = SearchItemsRouter;
