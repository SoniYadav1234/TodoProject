const express = require('express');

const checkAuth = require('../Middleware/auth'); // importing middleware for authentication

const { readTodolist, createTodolist, updateTodolist, deleteTodolist, readAllTodolist } = require('../controller/todolist.js')

const route = express.Router();

route.get('/:id', checkAuth, readTodolist); // api to fetch data about single todo list item

route.get('/allTodolist', checkAuth, readAllTodolist); // api to fetch all todo list segregrated basis of user with pagination

route.post('/create', checkAuth,createTodolist); // api to create new item in todo list

route.put('/:id', checkAuth,updateTodolist); // api to update description or mark as done for task

route.delete('/:id', checkAuth,deleteTodolist); // api to delete todolist

module.exports = route;