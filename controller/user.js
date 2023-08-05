const db = require('../model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/Constant');
const { fetchDataFromDb } = require('../utils/sql')

exports.createUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            email,
            password: hashedPassword
        }
        const sql = `INSERT INTO users_tb SET ?`;
        const userData = fetchDataFromDb(sql, user);
        if (!userData) {
            res.status(400).json({ message: "User not created" });
        } else {
            res.status(200).json({ message: "User created" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Something went wrong');
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const params = email;
        const sql = `SELECT password, name, id FROM users_tb WHERE is_Active = true AND email = ?`;
        const result = await fetchDataFromDb(sql, params);
        const passwordCompare = result[0].password || null;
        const checkedPassword = await bcrypt.compare(password, passwordCompare);
        if (checkedPassword === true) {
            const payload = {
                id: result[0].id,
                email: params,
                username: result[0].name,
            };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            if (token) {
                res.status(200).json({ message: 'You are succeessfully logged in!', Token: token })
            }
        } else {
            res.status(400).json({ message: "You entered wrong password!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" })
    }

}

exports.readUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const params = userId;
        const sql = `SELECT id, name, email FROM users_tb WHERE is_Active = true AND id = ?`;
        const result = await fetchDataFromDb(sql, params);
        if (result[0]) {
            res.status(200).json(result[0]);
        } else {
            res.status(400).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" })
    }
}

exports.updateUser = (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;
        const params = [name, email];
        const sql = `UPDATE users_tb SET name = ?, email = ? WHERE id = ${userId} AND is_Active = true`;
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

exports.deleteUser = (req, res) => {
    try {
        const userId = req.params.id;
        const sql = `UPDATE users_tb SET is_Active = false WHERE is_Active = true AND id = ?`;
        const updateData = fetchDataFromDb(sql, userId);
        if (!updateData) {
            res.status(400).json({ message: "User not deleted" });
        } else {
            res.status(200).json({ message: "User deleted" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Something went wrong');
    }
}
