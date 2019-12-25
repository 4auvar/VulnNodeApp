var express = require('express');
var router = express.Router();
var userSession = require('../../utils/userSession');
var user = require('./user');

router.get('/', userSession.isAuthenticated, user.renderDashboard);

router.post('/', user.authenticate);

router.get('/register', user.viewRegister);

router.post('/register', user.registerUser);

router.get('/error-based-sqli', userSession.isAuthenticated, user.errorBasedSqli);

router.post('/update-profile', userSession.isAuthenticated, user.updateProfile);

router.get('/blind-sqli', userSession.isAuthenticated, user.blindSqli);

router.post('/blind-sqli', userSession.isAuthenticated, user.searchUser);

router.get('/second-order-sqli', userSession.isAuthenticated, user.viewSecondOrderSqli);

router.get('/blind-sqli-blacklist', userSession.isAuthenticated, user.blindSqliBlackList);

router.post('/blind-sqli-blacklist', userSession.isAuthenticated, user.searchUserBlackList);

router.get('/change-password', userSession.isAuthenticated, user.viewChangePassword);

router.post('/change-password', userSession.isAuthenticated, user.changePassword);

router.get('/command-injection', userSession.isAuthenticated, user.viewCommandInjection);

router.post('/command-injection', userSession.isAuthenticated, user.commandInjection);

router.get('/arbitrary-file-retrieval', userSession.isAuthenticated, user.arbitraryFileRetrieval);

router.get('/regex-injection', userSession.isAuthenticated, user.viewRegExInjection);

router.post('/regex-injection', userSession.isAuthenticated, user.regExInjection);

router.get('/xxe', userSession.isAuthenticated, user.viewXxe);

router.post('/xxe', userSession.isAuthenticated, user.xxe);

module.exports = router;
