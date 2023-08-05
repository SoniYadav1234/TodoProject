const db = require('../model');
const { fetchDataFromDb } = require('../utils/sql');
const paginationFunction = require('../utils/pagination');

exports.createTodolist = async (req, res) => {
    const { task_name, description } = req.body;
    const todoData = {
        task_name: task_name,
        description: description,
        user_id: req.userData.id
    }
    const todolistData = db.query(`INSERT INTO todolist_tb SET ?`, todoData);
    if (!todolistData) {
        res.status(400).json({ message: "Todolist not created" });
    } else {
        res.status(200).json({ message: "Todolist created" });
    }
}

exports.readTodolist = async (req, res) => {
    try {
        const todoId = req.params.id;
        const params = todoId;
        const sql = `SELECT task_name, description, is_done FROM todolist_tb WHERE is_Active = true AND todo_id = ?`;
        const result = await fetchDataFromDb(sql, params);
        if (result[0]) {
            res.status(200).json(result[0]);
        } else {
            res.status(400).json({ message: "Todo list not found." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" })
    }
}

exports.readAllTodolist = async (req, res) => {
    try {
        const {from,to} = req.query;
        const { offset, pageSize } = paginationFunction.paginationWithFromTo(from,to);
        const userId = req.userData.id;
        const params = [userId, offset, pageSize];
        const sql = `SELECT task_name, description, is_done FROM todolist_tb  WHERE is_Active = true AND user_id = ? LIMIT ? OFFSET ?`;
        const result = await fetchDataFromDb(sql, params);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ message: "Data not found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" })
    }

}

exports.updateTodolist = (req, res) => {
    try {
        const todolistId = req.params.id;
        const { task_name, description, is_done } = req.body;
        const params = [task_name, description, is_done];
        const sql = `UPDATE todolist_tb SET task_name = ?, description = ?, is_done = ? WHERE todo_id = ${todolistId} AND is_Active = true`;
        const updateData = fetchDataFromDb(sql, params);
        if (!updateData) {
            res.status(400).json({ message: "User not updated" });
        } else {
            res.status(200).json({ message: "User updated" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Something went wrong');
    }
}

exports.deleteTodolist = (req, res) => {
    try {
        const todolistId = req.params.id;
        const sql = `UPDATE todolist_tb SET is_Active = false WHERE todo_id = ? AND is_Active = true`;
        const updateData = fetchDataFromDb(sql,todolistId);
        if (!updateData) {
            res.status(400).json({ message: "Todolist not deleted" });
        } else {
            res.status(200).json({ message: "Todolist deleted" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Something went wrong');
    }
}
