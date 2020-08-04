const User = require('../Models/user');
const bcrypt = require('bcrypt');
const passport  = require('passport');
const jwt = require('jsonwebtoken');
const error_types = require('./error_types');

let controller = {
    register: (req, res, next) => {
        console.log("Register");
        User.findOne({ email: req.body.email })
            .then(data => { 
                if (data) { //user exists
                    throw new error_types.InfoError("user already exists");
                }
                else { 
                    console.log("Creating user");
                    var hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                    let document = new User({
                        email: req.body.email || '',
                        name: req.body.name || '',
                        password: hash,
                        type: req.body.type || 'personal',
                        gender: req.body.gender || 'other',
                        coin: req.body.coin || 'dollar',
                        convert: req.body.convert || 1
                    });
                    return document.save();
                }
            })
            .then(data => { 
                res.json({ data: data });
            })
            .catch(err => { 
                next(err);
            })
    },
    login: (req, res, next) => {
        console.log("Login");
        User.findOne({ email: req.body.email })
        	.then(data=> {
        		if(!bcrypt.compareSync(req.body.password, data.password)){
        			throw new error_types.Error404("username or password not correct.");
        		}else{
	                const payload = {
	                    sub: data._id,
	                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
	                    email: data.email
	                };
	                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: process.env.JWT_ALGORITHM});
	                res.json({ data: { token: token } });
        		}
        	})
        	.catch(err => {
        		next(err);
        	})
    },
    getAll: (req, res, next) => {
    	console.log('Users');
    	User.find({},{ password:0 }).then(data=>res.json(data));
    },
    get: (req, res, next) => {
    	User.findOne({_id:req.user.sub}, {password: 0})
		    .then(data=>{res.json(data)})
		    .catch(err=>{res.json(err)}) 
    }
}

module.exports = controller;