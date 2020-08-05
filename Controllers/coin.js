const Coin = require('../Models/coin');
const User = require('../Models/user');
const Money = require('../Models/money');
const error_types = require('./error_types');

let controller = {
    create: (req, res, next) => {
        console.log("Create");
        let document = new Coin({
            coin: req.body.coin,
            convert: req.body.convert || 1
        });
        document.save().then(data => res.json({data: data})).catch(err => next(err));
    },
    all: (req, res, next) => {
        Coin.find({}).then(data=>res.json({data:data}));
    },
    update: (req, res, next) => {
        Coin.findOne({_id:req.param('id')})
            .then(data=>{
                data.convert = req.body.convert || data.convert;
                User.find({coin: data.coin})
                    .then(users=>{
                        users.forEach(user =>{
                            user.convert = req.body.convert || data.convert;
                            user.save();
                        });
                    })
                data.save();
                res.json({data:data})
            })
            .catch(err=>{res.json(err)}) ;
    },
    delete: (req, res, next) => {
        Coin.findOne({_id:req.param('id')})
            .then(data=>{
                User.find({coin: data.coin})
                    .then(users=>{
                        users.forEach(user =>{
                            user.coin = 'undefined';
                            user.save();
                        });
                    })
                Money.find({coin: data.coin})
                    .then(moneys=>{
                        moneys.forEach(money =>{
                            money.coin = 'undefined';
                            money.save();
                        });
                    }); 
            });
        Coin.deleteOne({_id:req.param('id')})
            .then(data=>{res.json(data)})
            .catch(err=>{res.json(err)}); 
    }
}

module.exports = controller;