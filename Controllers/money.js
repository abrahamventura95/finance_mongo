const Money = require('../Models/money');
const error_types = require('./error_types');
const moment = require('moment');

let controller = {
    create: (req, res, next) => {
        console.log("Create");
        let document = new Money({
            email: req.user.email,
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
        Money.find({email:req.user.email,type: req.param('type') }).then(data=>res.json({data:data}));
    },
    balance: (req, res, next) => {
        Money.find({email:req.user.email})
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
        Money.find({email:req.user.email,date: { $gte: start, $lte: end } }).then(data=>res.json({data:data}));
    },
    getbyDate: (req, res, next) => {
        var start = moment((req.param('date'))).startOf('day').format();
        var end = moment((req.param('date'))).endOf('day').format();
        Money.find({email:req.user.email,date: { $gte: start, $lte: end } }).then(data=>res.json({data:data}));
    },
    tag: (req, res, next) => {
        Money.find({email:req.user.email,tag: req.param('tag') }).then(data=>res.json({data:data}));
    },
    amount: (req, res, next) => {
        Money.find({email:req.user.email,amount: req.param('amount') }).then(data=>res.json({data:data}));
    },
    product: (req, res, next) => {
        Money.find({email:req.user.email,product: req.param('product') }).then(data=>res.json({data:data}));
    },
    update: (req, res, next) => {
        Money.findOne({_id:req.param('id')})
            .then(data=>{
                data.tag = req.body.tag || data.tag;
                data.date = req.body.date || data.date;
                data.amount = req.body.amount || data.amount;
                data.product = req.body.product || data.product;
                data.quantity = req.body.quantity || data.quantity;
                data.coin = req.body.coin || data.coin;
                data.convert = req.body.convert || data.convert;

                data.save();
                res.json(data)
            })
            .catch(err=>{res.json(err)}) 
    },
    delete: (req, res, next) => {
        Money.deleteOne({_id:req.param('id')})
            .then(data=>{res.json(data)})
            .catch(err=>{res.json(err)}) 
    }
}

module.exports = controller;