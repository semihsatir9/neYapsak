const express = require ('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root', 
    host: 'localhost',
    password: '',
    database: 'neyapsakdb',
})

db.query(
    "INSERT INTO user (username, password) VALUES (?,?)", ["userPlaceholder", "passwordPlaceholder"]
);

app.listen(3001, ()=> {
    console.log("Server is running on port 3001!");
});