var mysql = require('mysql');
var config = require('../config/config');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASS,
    database: config.DATABASE_NAME
});

function executeQueryWithParam(query, parameter, callback) {
    pool.query(query, parameter, callback);
}

module.exports = executeQueryWithParam;