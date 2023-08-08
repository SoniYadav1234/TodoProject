const express = require('express');

const { readTodolist, readAllTodolist, createTodolist, updateTodolist, deleteTodolist } = require('../controller/todolist.js')

const route = express.Router();

route.get('/allTodolist', readAllTodolist); // api to fetch all todo list segregrated basis of user with pagination

route.get('/:id', readTodolist); // api to fetch data about single todo list item

route.post('/create', createTodolist); // api to create new item in todo list

route.put('/:id', updateTodolist); // api to update description or mark as done for task

route.delete('/:id', deleteTodolist); // api to delete todolist

module.exports = route;