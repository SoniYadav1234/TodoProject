const express = require('express');

const users = require('./user') ; // importing user module

const todoList = require('./todolist'); // importing todolist module

const router = express.Router();

router.use('/user', users);  // endpoints for users

router.use('/todo', todoList); //endpoints for todoList

module.exports = router;