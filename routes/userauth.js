var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Userauth = require('../models/userauth');
var Reports = require('../models/reports');
var Payments = require('../models/payments');

router.post('/signin', function (req, res, next){

    Userauth.findOne({userId:req.body.userId}, (err,userinfo) =>{

        console.log("inside signin : Error " + err + " Userinfo: " + userinfo)

        if(err){
            return res.status(500).json({
                response:'An Error Occured',
                error:err,
                responseStatus:'3'
            });
        }

        if(!userinfo) {
            // return res.status(401).json({
            return res.json({
                response:' Invalid User',
                responseStatus: '1'
            })
        }
        // if (!bcrypt.compareSync(req.body.password, password)) {
        if (!(req.body.password === userinfo.password)) {
            return res.json({
                response: 'Login failed',
                responseStatus: '2'
            });
        }
        // // var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

        res.status(200).json({
            response:'Login successful',
            customerName:userinfo.customerName,
            userId:userinfo.userId,
            token:'testtoken',
             responseStatus: '0'

        });
    });
});


router.post('/validateUseridEmail',function (req,res,next) {

    Userauth.findOne({$and:[{userId:req.body.userId }, {customerEmail:req.body.customerEmail}]},function(err,result) {
        if(result) {
            res.json({
                responseStatus : '0',
                response: 'valid user id and email'
                })
        }

        else {
            res.json({
                responseStatus : '1',
                response: 'Invalid user id and email'
            })
        }
    });
});


router.post('/resetPassword',function (req,res,next) {

    Userauth.updateOne({userId:req.body.userId},{$set:{password:req.body.newPassword , lastUpdated:Date.now()}},function(err,result) {

        console.log(result)

        if(result) {
            res.json({
                responseStatus : '0',
                response: 'Password reset success'
            })
        }

        else {
            res.json({
                responseStatus : '1',
                response: 'Error while updating password'
            })
        }

    });



});

router.post('/validateCustomer',function (req,res,next) {
    console.log(req.body.customerId)

        Userauth.findOne({userId:req.body.customerId}, (err,userinfo) => {
        if(userinfo) {
            console.log(userinfo.validDate)
            if(userinfo.validDate < Date.now()) {
                console.log("Customer subscription ended")
                return res.json({
                    responseStatus : '1',
                    response: 'Customer subscription ended'
                })
            }
            else {
                return res.json({
                    responseStatus : '0',
                    response: 'Valid User'
                })
            }
        }
        else {
            // check whether user has already paid and reports uploaded in reports table

            console.log(req.body.customerId)
            Payments.findOne({userId:req.body.customerId}, function (err,result) {
                if(!result) {
                    return res.json({
                        responseStatus : '2',
                        response: 'New Customer, Please collect subscription fee.'
                    })
                }
                else
                {
                    if(result.validDate < Date.now())
                    {
                        return res.json({
                            responseStatus : '3',
                            response: 'Customer subscription ended.'
                        })
                    }

                    else {
                        return res.json({
                            responseStatus : '0',
                            response: 'Valid User'
                        })
                    }
                }
            });
        }
    });
});


module.exports = router;
