const { executeQueryWithParam, executeQuery } = require('../utils/mysqlConnectionPool');

class UsersModel {

    findUserById(parameter) {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM users WHERE id =" + parameter[0] + ";"
            executeQuery(query)
                .then((result) => { return resolve(result) })
                .catch((err) => { reject(err) });
        });
    }
    authenticateUser(parameter) {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM users WHERE email ='" + parameter[0] + "' AND password = '" + parameter[1] + "'";
            executeQuery(query).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    updateUserById(parameters) {
        let user = parameters[0];
        let id = parameters[1];
        return new Promise((resolve, reject) => {
            let query = queries.updateUserById;
            executeQueryWithParam(query, [user.fullname, user.username, user.email, user.phone, id]).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log("error : " + err);
                reject(err);
            });
        });
    }

    searchByName(parameters) {
        let username = parameters[0];
        return new Promise((resolve, reject) => {
            let query = "select id,username,email,fullname,phone from users where username like '%" + username + "%';";

            executeQuery(query).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log("error : " + err);
                reject(err);
            });
        });
    }

    registerUser(user) {
        user = user[0];
        return new Promise((resolve, reject) => {
            let query = queries.addUser;
            executeQueryWithParam(query, [user.fullname, user.username, user.email, user.phone, user.password]).then((result) => {
                resolve();
            }).catch((err) => {
                console.log("error : " + err);
                reject(err);
            });
        });
    }

    changePassword(params) {
        let password = params[0];
        let userId = params[1];
        return new Promise((resolve, reject) => {
            let query = queries.changePassword;
            executeQueryWithParam(query, [password, userId]).then((result) => {
                resolve();
            }).catch((err) => {
                console.log("error : " + err);
                reject(err);
            });
        });
    }

}

const queries = {
    updateUserById: "update users set fullname=?, username=?, email=?, phone=? where id=?",
    addUser: "insert into users (fullname,username,email,phone,password,profilepic) values(?,?,?,?,?,'/images/user2-160x160.jpg')",
    changePassword: "update users set password=? where id=?"
}

module.exports = UsersModel;