var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MoneySchema = Schema({
    email: {type: String, required: true},
    tag: String,
    date: Date,
    amount: {type: Number, required:true},
    product: String,
    quantity: Number,    
    type: ['incomeSale','outflowSale', 'incomeMove', 'outflowMove'],
    coin: {type: String, required: true},
    convert: {type: Number, required: true}
});

module.exports = mongoose.model('Money', MoneySchema, "money");