const express = require('express');

const {
    getAll,
    getById,
    postCheck,
    postRegistration,
    postRegistrationAdmin,
    getAuth,
    postAuth,
    deleteUser,
    patchUser,
} = require('./controller');

const usersRouter = express.Router();

usersRouter.get('/', getAll);
usersRouter.post('/check', postCheck);
usersRouter.post('/reg', postRegistration);
usersRouter.post('/regAdmin', postRegistrationAdmin);
usersRouter.get('/auth', getAuth);
usersRouter.post('/auth', postAuth);
usersRouter.get('/:id', getById);
usersRouter.delete('/:id', deleteUser);
usersRouter.patch('/:id', patchUser);

module.exports = usersRouter;
