const Money = require('../Models/money');
const error_types = require('./error_types');

let controller = {
    create: (req, res, next) => {
        console.log("Create");
        let document = new Money({
            email: req.user.sub,
            tag: req.body.tag || '',
            date: req.body.date || Date.now(),
            amount: req.body.amount || 0,
            product: req.body.product || '',
            quantity: req.body.quantity || 0,    
            type: req.body.type,
            coin: req.body.coin || 'dollar',
            convert: req.body.convert || 1
        });
        document.save().then(data => res.json({data: data})).catch(err => next(err));
    },
    all: (req, res, next) => {
        Money.find({}).then(data=>res.json({data:data}));
    },
    moneyUser: (req, res, next) => {
        console.log(req.body.type);
        Money.find({email:req.user.sub,type: req.body.type }).then(data=>res.json({data:data}));
    }
}

module.exports = controller;