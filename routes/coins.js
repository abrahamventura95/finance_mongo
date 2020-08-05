var express = require('express');
var router = express.Router();
var CoinController = require('../Controllers/coin');

router.post('/', CoinController.create);
router.put('/', CoinController.update);
router.delete('/', CoinController.delete);
router.get('/all', CoinController.all);


module.exports = router;
