var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Userauth = require('../models/userauth');
var jwt = require('jsonwebtoken');
var middleware = require("./middleware");
/**
 * @swagger
 * resourcePath: /
 * description: All about rest API
 * path: /signin
 * operations:
 *   -  httpMethod: POST
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      responseClass: Userauth
 *      nickname: login
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: userId
 *          description: Your username
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Your password
 *          paramType: query
 *          required: true
 *          dataType: string
 */


router.post('/signin', function (req, res, next){


    Userauth.findOne({userId:req.body.userId}, function(err,userinfo) {

        // // var token = jwt.sign({user: userinfo}, 'secret');
        // var token = jwt.sign({user: {"userId":req.body.userId,
        //         "customerRole":userinfo.customerRole}}, 'secret');

        // console.log(userinfo)
        // console.log(err)
        let token = ""

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

        token = jwt.sign({user: {"userId":req.body.userId,
                "customerRole":userinfo.customerRole}}, 'secret');

        res.status(200).json({
            response:'Login successful',
            userName:userinfo.customerName,
            userRole:userinfo.customerRole,
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

/**
 * @swagger
 * models:
 *   Userauth:
 *     id: Userauth
 *     properties:
 *       userId:
 *         type: String
 *       password:
 *         type: String
 */
