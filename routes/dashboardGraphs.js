var express = require('express');
var router = express.Router();
var Reports = require('../models/reports');
var Userprofile = require('../models/userprofile');
var jwt = require('jsonwebtoken');
var middlewareObj = require('./middleware');



router.use('/',function (req,res,next) {

    jwt.verify(req.query.token,'secret',function (err,decoded) {
        // console.log(Date.now())

        if(err)
        {
            // return res.status(401).json({
            return res.json({
                response:'Not Authenticated',
                responseStatus:'99'
            })
        }
        else {
            req.decoded = decoded
            console.log(decoded)
            if(req.decoded.user.userId === req.body.userId)
                next();
            else
            {
                res.json({
                    response: 'Please login again..!',
                    responseStatus:'99'
                });
            }
        }
    })

});
router.post('/usercount',middlewareObj.isAdmin,function (req,res,next) {
    Userprofile.aggregate([{ $group:{_id:"$city", citycount:{$sum:1}}}] , function (err,result) {
        if(!err)
        {
            res.json({
                usersbycity : result,
                responseStatus:'0'
            })
        }
        else {
            res.json({
                responseStatus:'1',
                response: 'error while fetching data from userprofiles table'
            })
        }
    })

});

router.post('/reportscount',middlewareObj.isAdmin,function (req,res,next) {

    Reports.aggregate([{$group:{_id:"$reportType",reportcount:{$sum:1}}}],function (err,result) {
        // console.log(result)

        if(!err)
        {
            res.json({
                reportsbycount : result,
                responseStatus:'0'
            })
        }
        else {
            res.json({
                responseStatus:'1',
                response: 'error while fetching data from reports table'
            })
        }

    })

});

router.post('/labCount',middlewareObj.isAdmin,function (req,res,next) {

    Reports.aggregate([{$group:{_id:"$uploadedBy",reportcount:{$sum:1}}}],function (err,result) {

        // console.log(result)

        if(!err)
        {
            res.json({
                reportsbyLab : result,
                responseStatus:'0'
            })
        }
        else {
            res.json({
                responseStatus:'1',
                response: 'error while fetching data from reports table'
            })
        }

    })

});

module.exports = router;

