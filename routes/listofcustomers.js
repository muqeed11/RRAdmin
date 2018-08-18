var express = require('express');
var router = express.Router();
var Userprofile = require('../models/userprofile');
var jwt = require('jsonwebtoken');

router.use('/',function (req,res,next) {

    jwt.verify(req.query.token,'secret',function (err,decoded) {

        if(err)
        {
            return res.status(401).json({
                response:'Not Authenticated'
            })
        }
        next();
    })

});



router.post('/customerdetails', function (req, res, next) {

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
                customerDetails:userinfo,
                });
        }

    });
});

module.exports = router;
