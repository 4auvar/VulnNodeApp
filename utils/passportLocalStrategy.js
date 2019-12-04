var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UsersController = require('../controllers/usersController');
var sha512 = require('./sha512');

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const usersController = new UsersController();
    usersController.findUserById(id, function (error, user) {
        return done(error, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        var credentials = { user_email: username, password: password };
        const usersController = new UsersController();
        usersController.authenticateUser(credentials, function (error, user) {
            if (error) {
                return done(error);
            }
            console.log("Logged in User: " + JSON.stringify(user));
            return done(null, user);
        });
    }
));