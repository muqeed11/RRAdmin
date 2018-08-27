var express = require('express');
var router = express.Router();
var Userprofile = require('../models/userprofile')
var Userauth = require('../models/userauth')

router.post('/register', function (req, res, next) {

    var userProfile = new Userprofile({
       customerName : req.body.customerName,
       userId : req.body.userId,
        customerEmail : req.body.customerEmail,
        gender:req.body.gender,
        createdDate:Date.now(),
        validDate:Date.now()+15983902224,
        area:req.body.area,
        city:req.body.city,
        phoneNumber:req.body.phoneNumber,
        familyDoctor:req.body.doctorName,
        customerRole : req.body.customerRole,
        lastUpdated:Date.now()
    });

    Userprofile.findOne({userId:req.body.userId}, (err,userinfo) =>{

        if (userinfo) {
            return res.json({
                response: 'Customer already exists with the same userid',
                userId:req.body.userId,
                responseStatus:'1'
            });
        }

        else {
            userProfile.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An Error Occured',
                        error: err
                    });
                }

                else if (!err) {

                    var userAuth = new Userauth({
                        userId: req.body.userId,
                        password: req.body.password,
                        customerEmail : req.body.customerEmail,
                        customerName:req.body.customerName,
                        active:'Y',
                        customerRole : req.body.customerRole,
                        createdDate:Date.now(),
                        validDate:Date.now()+15983902224,
                        lastUpdated:Date.now()
                    });
                    console.log('inside userauth- before save');

                    userAuth.save(function (err, result) {
                        console.log('inside userauth- after save');
                        if (err) {
                            return res.status(501).json({
                                title: 'An Error Occured..!',
                                error: err
                            });
                        }

                        res.status(201).json({
                            response: 'User Created',
                            userId:result.userId,
                            responseStatus: '0'
                        });


                    })
                }

            });
        }
    });

});

// router.post('/generateOTP',function (req,res,next) {
//     var val = Math.floor(1000 + Math.random() * 9000);
//     console.log(val)
//
//     var options = {
//         host: 'http://api.bulksms.com/v1',
//         port: 80,
//         method: 'POST'
//     };
//
//     // http.request(options,function (res) {
//     //
//     // }).end();
//
// });



module.exports = router;
