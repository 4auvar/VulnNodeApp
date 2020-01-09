var passport = require('passport');
var UsersController = require('../../controllers/usersController');


module.exports = {
    authenticate: function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return res.render("index", { message: err });
            } else if (!user) {
                return res.render("index", { message: "Invalid username or password!!" });
            } else {
                req.logIn(user, function (err) {
                    if (err) {
                        return res.render("index", { message: "Invalid username or password!!" });
                    }
                    req.session.ROLE = user.role_id;
                    setProfileCookie(req, res);
                    return renderDashboardView(req, res);
                });
            }
        })(req, res, next);
    },
    renderDashboard: function (req, res, next) {
        return renderDashboardView(req, res);
    },
    errorBasedSqli: function (req, res, next) {
        getUser(req.query.id)
            .then((user) => {
                if (user != undefined) {
                    return res.render('../views/error-based-sqli', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, userDetails: user });
                } else {
                    return res.render('../views/error-based-sqli', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, userDetails: undefined });
                }
            }).catch((err) => {
                return res.send(err);
            });
    },
    updateProfile: function (req, res, next) {
        const usersController = new UsersController();
        usersController.updateUserById(req.body, req.query.id)
            .then(() => {
                res.redirect("/error-based-sqli?id=" + req.query.id + "&default=English")
            }).catch((err) => {
                return res.send(err);
            });
    },
    blindSqli: function (req, res) {
        return res.render('../views/blind-sqli', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: true, htmlResponse: "" });
    },
    searchUser: function (req, res) {
        const usersController = new UsersController();
        // test1%' or '%'='
        usersController.searchByName(req.body.username)
            .then((htmlResponse) => {
                return res.render('../views/blind-sqli', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: htmlResponse });
            }).catch((err) => {
                console.log("err : " + err);
                return res.render('../views/blind-sqli', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: "" });
            });
    },
    viewRegister: function (req, res) {
        return res.render('../views/register', { errorMessage: "" });
    },
    registerUser: function (req, res) {
        const usersController = new UsersController();
        // test1%' or '%'='
        usersController.registerUser(req.body)
            .then(() => {
                return res.redirect('/');
            }).catch((err) => {
                console.log("err : " + err);
                return res.render('../views/register', { errorMessage: "Error: Please try again" });
            });
    },
    viewSecondOrderSqli: function (req, res) {
        const usersController = new UsersController();
        // test1%' or '%'='   
        usersController.searchByName(req.user.username)
            .then((htmlResponse) => {
                return res.render('../views/second-order-sqli', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: htmlResponse });
            }).catch((err) => {
                console.log("err : " + err);
                return res.render('../views/second-order-sqli', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: "" });
            });
    },
    blindSqliBlackList: function (req, res) {
        return res.render('../views/blind-sqli-blacklist', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: true, htmlResponse: "" });
    },
    searchUserBlackList: function (req, res) {
        const usersController = new UsersController();
        // %' OR '%'='
        usersController.searchUserBlackList(req.body.username)
            .then((htmlResponse) => {
                return res.render('../views/blind-sqli-blacklist', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: htmlResponse });
            }).catch((err) => {
                console.log("err : " + err);
                return res.render('../views/blind-sqli-blacklist', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: "" });
            });
    },

    viewReflectedXSS: function (req, res) {
        return res.render('../views/reflected-xss', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: true, htmlResponse: "" });
    },
    reflectedXSS: function (req, res) {
        const usersController = new UsersController();
        usersController.searchUserBlackList(req.body.username)
            .then((htmlResponse) => {
                return res.render('../views/reflected-xss', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: htmlResponse });
            }).catch((err) => {
                console.log("err : " + err);
                return res.render('../views/reflected-xss', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: "" });
            });
    },


    viewChangePassword: function (req, res) {
        return res.render('../views/change-password', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: "" });
    },
    changePassword: function (req, res) {
        const usersController = new UsersController();
        usersController.changePassword(req.body.password, req.body.id)
            .then((htmlResponse) => {
                return res.render('../views/change-password', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: htmlResponse });
            }).catch((err) => {
                console.log("err : " + err);
                return res.render('../views/change-password', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: "" });
            });
    },
    viewCommandInjection: function (req, res) {
        return res.render('../views/command-injection', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: "" });
    },
    commandInjection: function (req, res) {
        const usersController = new UsersController();
        usersController.commandInjection(req.body.ip)
            .then((htmlResponse) => {
                return res.render('../views/command-injection', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: htmlResponse });
            }).catch((err) => {
                return res.render('../views/command-injection', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: err });
            });
    },
    arbitraryFileRetrieval: function (req, res) {
        const usersController = new UsersController();
        usersController.arbitraryFileRetrieval(req.query.filename)
            .then((htmlResponse) => {
                return res.render('../views/arbitrary-file-retrieval', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: htmlResponse });
            }).catch((err) => {
                return res.render('../views/arbitrary-file-retrieval', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: err });
            });
    },
    viewRegExInjection: function (req, res) {
        return res.render('../views/regex-injection', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: "" });
    },
    regExInjection: function (req, res) {
        const usersController = new UsersController();
        usersController.regExInjection(req.body.search)
            .then((htmlResponse) => {
                return res.render('../views/regex-injection', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: htmlResponse });
            }).catch((err) => {
                return res.render('../views/regex-injection', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: err });
            });
    },
    viewXxe: function (req, res) {
        return res.render('../views/xxe', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: "" });
    },
    xxe: function (req, res) {
        const usersController = new UsersController();
        usersController.xxe(req.body.search)
            .then((htmlResponse) => {
                return res.send(htmlResponse);
            }).catch((err) => {
                return res.send(err);
            });
    },
    viewDeserialization: function (req, res) {
        const usersController = new UsersController();
        usersController.deserialization(req.cookies)
            .then((htmlResponse) => {
                return res.render('../views/deserialization', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: htmlResponse });
            }).catch((err) => {
                return res.render('../views/deserialization', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: err });
            });
    },

    storedXSS: function (req, res) {
        return res.render('../views/stored-xss', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: "" });
    },
    domXSS: function (req, res) {
        return res.render('../views/dom-xss', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: "" });
    },
    viewXssExercise: function (req, res) {
        return res.render('../views/xss-exercise', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: true, htmlResponse: "" });
    },
    xssExercise: function (req, res) {
        const usersController = new UsersController();
        usersController.searchByName(req.body.username)
            .then((htmlResponse) => {
                return res.render('../views/xss-exercise', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: htmlResponse });
            }).catch((err) => {
                console.log("err : " + err);
                return res.render('../views/xss-exercise', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, isGetReq: false, htmlResponse: "" });
            });
    },
    idorViewProfile: function (req, res, next) {
        getUser(req.query.id)
            .then((user) => {
                if (user != undefined) {
                    return res.render('../views/idor', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, userDetails: user });
                } else {
                    return res.render('../views/idor', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, userDetails: undefined });
                }
            }).catch((err) => {
                return res.send(err);
            });
    },
    idorUpdateProfile: function (req, res, next) {
        const usersController = new UsersController();
        usersController.updateUserById(req.body, req.query.id)
            .then(() => {
                res.redirect("/idor?id=" + req.query.id + "&default=English&page=idor")
            }).catch((err) => {
                return res.send(err);
            });
    },
    sessionMgmt: function (req, res) {
        return res.render('../views/session-mgmt', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic, htmlResponse: "" });
    },
}

function renderDashboardView(req, res) {
    return res.render('../views/dashboard', { id: req.user.id, fullName: req.user.fullname, profilePic: req.user.profilepic });
}

function getUser(id) {
    const usersController = new UsersController();
    return usersController.findUserById(id);
}

function setProfileCookie(req, res) {
    let userCookie = '{"id":"' + req.user.id + '","fullname" : "' + req.user.fullname + '"}';
    let buff = new Buffer(userCookie);
    let base64data = buff.toString('base64');
    
    res.cookie('user', base64data, {
        maxAge: 900000,
        httpOnly: true
    });
}