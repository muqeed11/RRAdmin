var express = require('express');
var router = express.Router();
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

router.post('/customerdetails',middlewareObj.isAdmin,function (req, res, next) {

    Userprofile.find(function(err,userinfo) {

        if (err) {
            return res.json({
                title: 'An Error Occured',
                responseStatus:'1',
                error: err
            });
        }

        else {

            res.status(200).json({
                response: 'Customer details',
                responseStatus:'0',
                customerDetails:userinfo,
                });
        }

    });
});

module.exports = router;
