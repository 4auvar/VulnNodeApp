var express = require('express');
var router = express.Router();
var userSession = require('../../utils/userSession');
var organization = require('./organization');

router.get('/organization', userSession.isAuthenticated, organization.renderOrganization);

// router.post('/organization',userSession.isAuthenticated, organization.updateOrganization);

module.exports = router;
