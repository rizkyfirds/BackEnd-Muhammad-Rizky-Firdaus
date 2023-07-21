var mysql = require('mysql2');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaan_lenu"
});

module.exports = db;