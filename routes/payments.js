var express = require('express');
var router = express.Router();
var Payments = require('../models/payments');
var Userprofile = require('../models/userprofile')
var Userauth = require('../models/userauth')

router.post('/transactions',function (req,res,next) {

    var validPeriod = 0;
    console.log(req.body.customerPlan)
    if(req.body.customerPlan === '500INR(6Months)')
         // validPeriod = 15983902224
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

        if(err)
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

                if(err){
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
                        console.log('inside userauth- after save',req.body.customerId,err,result);
                        if (err) {
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
