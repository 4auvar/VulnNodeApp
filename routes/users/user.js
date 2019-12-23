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
                    return renderDashboard(req, res);
                });
            }
        })(req, res, next);
    },
    renderDashboard: function (req, res, next) {
        return renderDashboard(req, res);
    },
    errorBasedSqli: function (req, res, next) {
        getUser(req.query.id)
            .then((user) => {
                if (user != undefined) {
                    return res.render('../views/error-based-sqli', { id: req.user.id, fullName: req.user.fullname, userDetails: user });
                } else {
                    return res.render('../views/error-based-sqli', { id: req.user.id, fullName: req.user.fullname, userDetails: undefined });
                }
            }).catch((err) => {
                return res.send(err);
            });
    },
    updateProfile: function (req, res, next) {
        const usersController = new UsersController();
        console.log("user.id : " + req.query.id);
        usersController.updateUserById(req.body, req.query.id)
            .then(() => {
                res.redirect("/error-based-sqli?id=" + req.query.id + "&default=English")
            }).catch((err) => {
                return res.send(err);
            });
    },
    blindSqli: function (req, res) {
        return res.render('../views/blind-sqli', { id: req.user.id, fullName: req.user.fullname, isGetReq: true, htmlResponse: "" });
    },
    searchUser: function (req, res) {
        const usersController = new UsersController();
        // test1%' or '%'='
        usersController.searchByName(req.body.username)
            .then((htmlResponse) => {
                return res.render('../views/blind-sqli', { id: req.user.id, fullName: req.user.fullname, isGetReq: false, htmlResponse: htmlResponse });
            }).catch((err) => {
                console.log("err : " + err);
                return res.render('../views/blind-sqli', { id: req.user.id, fullName: req.user.fullname, isGetReq: false, htmlResponse: "" });
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
            return res.render('../views/second-order-sqli', { id: req.user.id, fullName: req.user.fullname, isGetReq: false, htmlResponse: htmlResponse });
        }).catch((err) => {
            console.log("err : " + err);
            return res.render('../views/second-order-sqli', { id: req.user.id, fullName: req.user.fullname, isGetReq: false, htmlResponse: "" });
        });
    },
    blindSqliBlackList: function (req, res) {
        return res.render('../views/blind-sqli-blacklist', { id: req.user.id, fullName: req.user.fullname, isGetReq: true, htmlResponse: "" });
    },
    searchUserBlackList: function (req, res) {
        const usersController = new UsersController();
        // test1%' or '%'='
        usersController.searchUserBlackList(req.body.username)
            .then((htmlResponse) => {
                return res.render('../views/blind-sqli-blacklist', { id: req.user.id, fullName: req.user.fullname, isGetReq: false, htmlResponse: htmlResponse });
            }).catch((err) => {
                console.log("err : " + err);
                return res.render('../views/blind-sqli-blacklist', { id: req.user.id, fullName: req.user.fullname, isGetReq: false, htmlResponse: "" });
            });
    },
}

function renderDashboard(req, res) {
    return res.render('../views/dashboard', { id: req.user.id, fullName: req.user.fullname });
}

function getUser(id) {
    const usersController = new UsersController();
    return usersController.findUserById(id);
}

