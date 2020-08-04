var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
var UserController = require('../Controllers/user');
/* GET users listing. */
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/all', UserController.getAll);
router.get('/', auth.ensureAuthenticated, UserController.get);

module.exports = router;
