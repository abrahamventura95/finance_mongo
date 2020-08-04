const Money = require('../Models/money');
const error_types = require('./error_types');
const moment = require('moment');

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
        Money.find({email:req.user.sub,type: req.param('type') }).then(data=>res.json({data:data}));
    },
    balance: (req, res, next) => {
        Money.find({email:req.user.sub})
            .then(data=>{
                let obj = {
                    balance: 0,
                    incomeMove: 0,
                    incomeSale: 0,
                    outflowMove: 0,
                    outflowSale: 0
                };
                data.forEach(value =>{
                    console.log(value.amount);
                    if(value.type == 'incomeMove'){
                        obj.balance += value.amount;
                        obj.incomeMove += value.amount;
                    } 
                    if(value.type ==  'incomeSale'){
                        obj.balance += value.amount;
                        obj.incomeSale += value.amount;
                    } 
                    if(value.type == 'outflowMove'){
                        obj.balance -= value.amount;
                        obj.outflowMove += value.amount;
                    } 
                    if(value.type ==  'outflowSale'){
                        obj.balance -= value.amount;
                        obj.outflowSale += value.amount;
                    } 
                });
                res.json({balance: obj});
            });
    },
    getbyMonth: (req, res, next) => {
        var date =  new Date(req.param('month') +'-01-' + req.param('year')); //Get month + year date
        
        var start = moment(date.toISOString()).startOf('month').format();
        var end = moment(date.toISOString()).endOf('month').format();
        Money.find({email:req.user.sub,date: { $gte: start, $lte: end } }).then(data=>res.json({data:data}));
    },
    getbyDate: (req, res, next) => {
        var start = moment((req.param('date'))).startOf('day').format();
        var end = moment((req.param('date'))).endOf('day').format();
        Money.find({email:req.user.sub,date: { $gte: start, $lte: end } }).then(data=>res.json({data:data}));
    },
    tag: (req, res, next) => {
        Money.find({email:req.user.sub,tag: req.param('tag') }).then(data=>res.json({data:data}));
    },
    amount: (req, res, next) => {
        Money.find({email:req.user.sub,amount: req.param('amount') }).then(data=>res.json({data:data}));
    },
    product: (req, res, next) => {
        Money.find({email:req.user.sub,product: req.param('product') }).then(data=>res.json({data:data}));
    }
}

module.exports = controller;