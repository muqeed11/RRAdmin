var express = require('express');
var router = express.Router();
var Payments = require('../models/payments');
var Userprofile = require('../models/userprofile')
var Userauth = require('../models/userauth')
var jwt = require('jsonwebtoken');


router.use('/',function (req,res,next) {

    jwt.verify(req.query.token,'secret',function (err,decoded) {

        if(err)
        {
            return res.status(401).json({
                response:'Not Authenticated',
                responseStatus:'99',
                error:err

            })
        }
        next();
    })

});

router.post('/transactions',function (req,res,next) {

    var validPeriod = 0;
    if(req.body.customerPlan === '500INR(6Months)')
         validPeriod = 15897600000
    else {
        validPeriod = 31536000000
    }


    var paymentSchema = new Payments({
        userId:req.body.customerId,
        customerPlan:req.body.customerPlan,
        paidDate:Date.now(),
        customerValidDate:Date.now() + validPeriod,
        paidTo:req.body.uploadedBy,
        createdDate:Date.now(),
        lastUpdated:Date.now()

    });

    paymentSchema.save(function (err,result) {

        if(!result)
        {
            return res.json({
                response: 'Payments failure',
                responseStatus:'1'
            })
        }
        else {

            // update profiles and userauths tables also
            var userProfile = {
                validDate : Date.now() + validPeriod,
                lastUpdated:Date.now()
            };

            // Userprofile.findOneAndUpdate({userId:req.body.userId},req.body,{new:true},function (err, userinfo) {
            Userprofile.updateOne({userId:req.body.customerId},{$set:userProfile},function (err, userinfo) {

                if(!userinfo){
                    return res.json({
                        title: 'An Error Occured',
                        responseStatus:'1',
                        error: err
                    });
                }

                else {

                    var userAuth = ({
                        validDate:Date.now()+validPeriod,
                        lastUpdated:Date.now()
                    });

                    Userauth.updateOne({userId:req.body.customerId},{$set:userAuth},function (err, result) {
                        if (!result) {
                            return res.json({
                                title: 'An Error Occured..!',
                                error: err
                            });
                        }
                    })
                }

            });

            return res.json({
                response: 'Payments Success',
                responseStatus: '0'
            })
        }

    });



});

module.exports = router;
