var express = require('express');
var router = express.Router();
var Userprofile = require('../models/userprofile');
var Userauth = require('../models/userauth');
var Reports = require('../models/reports');
var jwt = require('jsonwebtoken');
var Payments = require('../models/payments');

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
router.post('/customerid',function(req,res,next){

    // console.log(req.body.userId);
    Userprofile.findOne({userId:req.body.userId},function (err1,customerinfo) {
            if(!err1)
            {
                Reports.find({userId:req.body.userId},function (err2,reportsinfo) {
                    console.log("reportsinfo",reportsinfo.length)

                    if(reportsinfo.length>0) {

                        if (customerinfo) {

                            return res.json({
                                responseStatus: '0',
                                customerDetails: customerinfo,
                                reportDetails: reportsinfo
                            })
                        }

                        else {
                            return res.json({
                                responseStatus: '1',
                                response:'No Customer Details,only Reports',
                                customerDetails:{userId:req.body.userId},
                                reportDetails: reportsinfo
                            })
                        }
                    }
                    else {
                        return res.json({
                            responseStatus: '2',
                            response:'No reports, No customer details',
                            customerDetails: {userId:req.body.userId},
                            reportDetails: reportsinfo
                        })
                    }


                });

            }
            else {

                return res.json({
                    responseStatus: '3',
                    response: 'An Error Occurred while fetching user details'
                })
            }
    });
});


router.post('/customerupdate',function (req,res,next) {
    console.log("inside customer update backend")

    var userProfile = {
        customerName : req.body.customerName,
        userId : req.body.userId,
        customerEmail : req.body.customerEmail,
        gender:req.body.gender,
        dateOfBirth:req.body.dateOfBirth,
        area:req.body.area,
        city:req.body.city,
        phoneNumber:req.body.userId,
        married:req.body.married,
        occupation:req.body.occupation,
        habits:req.body.habits,
        medicalHistory:req.body.medicalHistory,
        familyDoctor:req.body.familyDoctor,
        doctorNumber:req.body.doctorNumber,
        lastUpdated:Date.now()
    };

    console.log(userProfile)
    Userprofile.updateOne({"userId":req.body.userId},{$set:userProfile},function (err, userinfo) {
        console.log(err)


        if(err){
            return res.json({
                title: 'An Error Occured',
                responseStatus:'1',
                error: err
            });
        }else{
            res.json({
                response: 'Customer details updated',
                responseStatus: '0'
            })
        }
    })
});

// router.post('/validateUseridEmail',function (req,res,next) {
//
//     Userauth.findOne({$and:[{userId:req.body.userId }, {customerEmail:req.body.customerEmail}]},function(err,result) {
//
//         if(result) {
//             res.json({
//                 responseStatus : '0',
//                 response: 'valid user id and email'
//             })
//         }
//
//         else {
//             res.json({
//                 responseStatus : '1',
//                 response: 'Invalid user id and email'
//             })
//         }
//     });
// });


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
                response: 'Error while resetting password'
            })
        }

    });
});


router.post('/changePassword',function (req,res,next) {
console.log(req.body.userId , req.body.password)

    Userauth.findOne({userId:req.body.userId,password:req.body.password},function (err,result1) {

        if(result1) {
            Userauth.updateOne({userId:req.body.userId,password:req.body.password},{$set:{password:req.body.newPassword , lastUpdated:Date.now()}},function(err,result) {
                // var token = jwt.sign({user: result}, 'secret', {expiresIn: 7200});

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
        }
        else
        {
            res.json({
                responseStatus : '2',
                response: 'Wrong password..!'
            })
        }
    });


});

router.post('/validateCustomer',function (req,res,next) {
    console.log(req.body.customerId)

    Userauth.findOne({userId:req.body.customerId}, (err,userinfo) => {
        // var token = jwt.sign({user: userinfo}, 'secret', {expiresIn: 7200});

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



router.post('/getprofile', function (req, res, next) {

    Userprofile.findOne({userId:req.body.userId}, (err,userinfo) =>{
        // console.log("inside getprofile")
        // console.log(req.body.userId)
        // console.log(userinfo)
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
                customerName: userinfo.customerName,
                userId: userinfo.userId,
                dateOfBirth : "" + userinfo.dateOfBirth,
                gender: userinfo.gender,
                married: "" +userinfo.married,
                occupation : "" +userinfo.occupation,
                habits:"" +userinfo.habits,
                customerEmail : userinfo.customerEmail,
                medicalHistory : "" +userinfo.medicalHistory,
                familyDoctor : "" +userinfo.familyDoctor,
                doctorNumber : "" +userinfo.doctorNumber,
                area :"" + userinfo.area,
                city : "" + userinfo.city,
                responseStatus: '0'


            });
        }


    });
});

router.post('/updateprofile',function (req, res, next) {

    var userProfile = {
        customerName : req.body.customerName,
        userId : req.body.userId,
        customerEmail : req.body.customerEmail,
        gender:req.body.gender,
        dateOfBirth:req.body.dateOfBirth,
        area:req.body.area,
        city:req.body.city,
        phoneNumber:req.body.userId,
        married:req.body.married,
        occupation:req.body.occupation,
        habits:req.body.habits,
        medicalHistory:req.body.medicalHistory,
        familyDoctor:req.body.familyDoctor,
        doctorNumber:req.body.doctorNumber,
        lastUpdated:Date.now()
    };

    // Userprofile.findOneAndUpdate({userId:req.body.userId},req.body,{new:true},function (err, userinfo) {
    Userprofile.updateOne({userId:req.body.userId},{$set:userProfile},function (err, userinfo) {

        if(err){
            return res.json({
                title: 'An Error Occured',
                responseStatus:'1',
                error: err
            });
        }else{
            res.json({
                response: 'Customer details updated',
                responseStatus: '0'
            })
        }
    })
});
module.exports = router;
