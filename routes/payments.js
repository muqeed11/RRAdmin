var express = require('express');
var router = express.Router();
var Payments = require('../models/payments');

router.post('/payments',function (req,res,next) {


    var paymentSchema = new Payments({
        userId:req.body.customerId,
        amountPaid:req.body.amountPaid,
        paidDate:Date.now(),
        customerValidDate:Date.now() + req.body.validPeriod,
        paidTo:req.body.paidTo,
        createdDate:Date.now(),
        lastUpdated:Date.now()

    });

    paymentSchema.save(function (err,result) {

        if(err)
        {
            return res.json({
                response: 'Payments failure',
                responseStatus:'1'
            })
        }
        else {
            return res.json({
                response: 'Payments Success',
                responseStatus: '0'
            })
        }

    });



});

module.exports = router;
