const express = require('express');

const { getSearchList } = require('./controller');

const SearchItemsRouter = express.Router();

SearchItemsRouter.get('/', getSearchList);

module.exports = SearchItemsRouter;
