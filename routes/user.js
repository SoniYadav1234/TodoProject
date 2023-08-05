const express = require('express');

const checkAuth = require('../Middleware/auth'); // importing middleware for authentication

const { createUser, login, readUser, updateUser, deleteUser } = require('../controller/user'); 

const route = express.Router();

route.get('/:id', readUser); // api to fetch data about user

route.post('/create', createUser); // api to create user

route.post('/login', login); // api for user authentication 

route.put('/:id', checkAuth, updateUser); // api to update user

route.delete('/:id', checkAuth, deleteUser); // api todelete user

module.exports = route;