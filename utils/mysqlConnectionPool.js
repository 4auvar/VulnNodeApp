var mysql = require('mysql');
var config = require('../config/config');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASS,
    database: config.DATABASE_NAME
});

function executeQueryWithParam(query, parameters, callback) {
    return new Promise((resolve, reject) => {
        pool.query(query, parameters, (err, res) => {
            if (err) {
                return reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function executeQuery(query) {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, res) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(res);
            }
        });
    });


}

module.exports = {
    executeQueryWithParam: executeQueryWithParam,
    executeQuery: executeQuery
};