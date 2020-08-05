var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth');
var MoneyController = require('../Controllers/money');

router.post('/', auth.ensureAuthenticated, MoneyController.create);
router.get('/', auth.ensureAuthenticated, MoneyController.moneyUser);
router.get('/all', MoneyController.all);
router.get('/balance', auth.ensureAuthenticated, MoneyController.balance);
router.get('/date', auth.ensureAuthenticated, MoneyController.getbyDate);
router.get('/month', auth.ensureAuthenticated, MoneyController.getbyMonth);
router.get('/tag', auth.ensureAuthenticated, MoneyController.tag);
router.get('/amount', auth.ensureAuthenticated, MoneyController.amount);
router.get('/product', auth.ensureAuthenticated, MoneyController.product);
router.put('/', auth.ensureAuthenticated, MoneyController.update);
router.delete('/', auth.ensureAuthenticated, MoneyController.delete);

module.exports = router;
