var express = require('express');
var router = express.Router();
var userSession = require('../../utils/userSession');
var user = require('./user');

router.get('/', userSession.isAuthenticated, user.renderDashboard);

router.post('/', user.authenticate);

router.get('/error-based-sqli', userSession.isAuthenticated, user.ErrorBasedSqli);

router.post('/update-profile', userSession.isAuthenticated, user.updateProfile);

module.exports = router;
