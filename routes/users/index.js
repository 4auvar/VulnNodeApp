var express = require('express');
var router = express.Router();
var userSession = require('../../utils/userSession');
var user = require('./user');

router.get('/', userSession.isAuthenticated, user.renderDashboard);

router.post('/', user.authenticate);

module.exports = router;
