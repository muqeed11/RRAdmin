var express = require('express');
var router = express.Router();
var Userprofile = require('../models/userprofile')

router.post('/customerdetails', function (req, res, next) {

    Userprofile.find(function(err,userinfo) {
        // console.log("inside listofcustomers")
        // console.log(userinfo)
        if (err) {
            return res.json({
                title: 'An Error Occured',
                responseStatus:'1',
                error: err
            });
        }

        else {
            console.log(Date.now());
            console.log(Date.now()+15983902224);
            res.status(200).json({
                response: 'Customer details',
                customerDetails:userinfo,
                });
        }

    });
});

module.exports = router;
