var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: String,
    type: ['personal','bussiness'],
    gender: ['male', 'female', 'other'],
    coin: {type: String, required: true},
    convert: {type: Number, required: true}
});

module.exports = mongoose.model('User', UserSchema, "users");