var UsersModel = require("../models/usersModel");

class UsersController {
    constructor() {
        this.usersModel = new UsersModel();
    }
    findUserById(parameter) {
        return new Promise((resolve, reject) => {
            this.usersModel.findUserById([parameter])
                .then((result) => {
                    return resolve(result[0])
                }).catch((err) => {
                    return reject(err);
                });
        });
    }

    authenticateUser(credentials) {
        return new Promise((resolve, reject) => {
            this.usersModel.authenticateUser([credentials.user_email, credentials.password])
                .then((result) => {
                    return resolve(result[0]);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    updateUserById(user, id) {
        return new Promise((resolve, reject) => {
            this.usersModel.updateUserById([user, id])
                .then(() => {
                    return resolve();
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }
}

module.exports = UsersController;