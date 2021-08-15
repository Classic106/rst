const express = require('express');

const usersController = require('./controller');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.post('/check', usersController.postCheck);
usersRouter.post('/reg', usersController.postRegistration);
usersRouter.get('/auth', usersController.getAuth);
usersRouter.post('/auth', usersController.postAuth);
usersRouter.get('/:id', usersController.getById);
usersRouter.delete('/:id', usersController.delete);
usersRouter.patch('/:id', usersController.patch);
//usersRouter.get('/token/:token', usersController.getByToken);

module.exports = usersRouter;
