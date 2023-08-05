const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'coder_sona',
    password: 'Coder@1234',
    database: 'todo_DB'
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Database Connected Successfully..!!');
    }
});

module.exports = connection;