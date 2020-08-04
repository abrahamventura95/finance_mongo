var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
var MoneyController = require('../Controllers/money');
/* GET users listing. */
router.post('/', auth.ensureAuthenticated, MoneyController.create);
router.get('/', auth.ensureAuthenticated, MoneyController.moneyUser);
router.get('/all', MoneyController.all);
router.get('/balance', auth.ensureAuthenticated, MoneyController.balance);
router.get('/date', auth.ensureAuthenticated, MoneyController.getbyDate);
router.get('/month', auth.ensureAuthenticated, MoneyController.getbyMonth);

module.exports = router;
