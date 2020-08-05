var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoinSchema = Schema({
    coin: {type: String, required: true},
    convert: {type: Number, required: true}
});

module.exports = mongoose.model('Coin', CoinSchema, "coin");