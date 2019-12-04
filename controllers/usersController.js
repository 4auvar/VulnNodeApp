var UsersModel = require("../models/usersModel");

class UsersController {
    constructor() {
        this.usersModel = new UsersModel();
    }
    findUserById(parameter, callback) {
        this.usersModel.findUserById([parameter], function (error, result, fields) {
            if (error)
                return callback(error, false)
            else if (result.length == 1)
                return callback(null, result[0]);
            else
                return callback(null, false);
        });
    }

    authenticateUser(credentials, callback) {
        this.usersModel.authenticateUser([credentials.user_email, credentials.password], function (error, result, fields) {
            if (error)
                return callback(error, false)
            else if (result.length == 1)
                return callback(null, result[0]);
            else
                return callback(null, false);
        });
    }
}

module.exports = UsersController;