var passport = require('passport');

module.exports = {
    authenticate: function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return res.render("index", { message: "Invalid username or password!!" });
            } else if (!user) {
                return res.render("index", { message: "Invalid username or password!!" });
            } else {
                req.logIn(user, function (err) {
                    if (err) {
                        return res.render("index", { message: "Invalid username or password!!" });
                    }
                    req.session.ROLE = user.role_id;
                    return renderDashboard(res);
                });
            }
        })(req, res, next);
    },
    renderDashboard: function (req, res, next) {
        return renderDashboard(res);
    }
}

function renderDashboard(res)
{
    return res.render('../views/dashboard');
}