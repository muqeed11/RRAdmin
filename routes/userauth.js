var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Userauth = require('../models/userauth');
var Reports = require('../models/reports');
var Payments = require('../models/payments');
var jwt = require('jsonwebtoken');


router.post('/signin', function (req, res, next){


    Userauth.findOne({userId:req.body.userId}, (err,userinfo) =>{

        var token = jwt.sign({user: userinfo}, 'secret', {expiresIn: 7200});


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
                token:"",
                responseStatus: '1'
            })
        }
        // if (!bcrypt.compareSync(req.body.password, password)) {
        if (!(req.body.password === userinfo.password)) {
            return res.json({
                response: 'Login failed',
                token:"",
                responseStatus: '2'
            });
        }

        res.status(200).json({
            response:'Login successful',
            customerName:userinfo.customerName,
            userId:userinfo.userId,
            token:token,
             responseStatus: '0'

        });
    });
});


router.post('/resetPassword',function (req,res,next) {

    Userauth.updateOne({userId:req.body.userId},{$set:{password:req.body.newPassword , lastUpdated:Date.now()}},function(err,result) {
        // var token = jwt.sign({user: result}, 'secret', {expiresIn: 7200});

        // console.log(result)

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


module.exports = router;
