var executeQueryWithParam = require('../utils/mysqlConnectionPool');

class UsersModel {
    findUserById(parameter, callback) {
        executeQueryWithParam(queries.findUserById, parameter, function (error, result, fields) {
            return callback(error, result, fields);
        });
    }
    authenticateUser(parameter, callback) {
        executeQueryWithParam(queries.authenticateUser, parameter, function (error, result, fields) {
            return callback(error, result, fields);
        });
    }
}

const queries = {
    findUserById: "SELECT * FROM users WHERE id=?",
    authenticateUser: "SELECT * FROM users WHERE email = ? AND password = ?"
}

module.exports = UsersModel;