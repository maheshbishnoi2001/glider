const mysql = require('mysql2');
const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"glider"
})

module.exports = db;