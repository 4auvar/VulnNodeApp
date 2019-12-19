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
            console.log("query : " + query);
            executeQueryWithParam(query, [user.fullname, user.username, user.email, user.phone, id]).then((result) => {
                console.log("success");
                resolve(result);
            }).catch((err) => {
                console.log("error : " + err);
                reject(err);
            });
        });
    }
}

const queries = {
    updateUserById: "update users set fullname=?, username=?, email=?, phone=? where id=?"
}

module.exports = UsersModel;