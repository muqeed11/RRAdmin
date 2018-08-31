var express = require('express');
var router = express.Router();
var Userprofile = require('../models/userprofile');
var Userauth = require('../models/userauth');
var Reports = require('../models/reports');
var jwt = require('jsonwebtoken');
var Payments = require('../models/payments');
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
            req.decoded = decoded;
            if(!(req.decoded.user.userId === req.body.userId))
            {
                res.json({
                    response: 'Please login again..!',
                    responseStatus:'99'
                });
            }
            else
                next();
        }
    })

});
router.post('/customerid',middlewareObj.isAdmin,function(req,res,next) {

    console.log('userid',req.body.userId);
    console.log('customerid',req.body.customerId);
    Userprofile.findOne({userId: req.body.customerId}, function (err1, customerinfo) {
        if (!err1) {
            Reports.find({userId: req.body.customerId}, function (err2, reportsinfo) {
                if (!err2) {
                    if ((reportsinfo.length > 0) && (customerinfo)) {
                        return res.json({
                            responseStatus: '0',
                            customerDetails: customerinfo,
                            reportDetails: reportsinfo
                        })
                    }
                    else if (!(reportsinfo.length > 0) && (customerinfo)) {
                        return res.json({
                            responseStatus: '1',
                            response: 'only Customer Details,No Reports',
                            customerDetails: customerinfo,
                            reportDetails: reportsinfo
                        })
                    }

                    else if ((reportsinfo.length > 0) && (!customerinfo)) {
                        return res.json({
                            responseStatus: '2',
                            response: 'No Customer Details,Only Reports',
                            customerDetails: {userId: req.body.customerId},
                            reportDetails: reportsinfo
                        })
                    }

                    else
                        return res.json({
                            responseStatus: '3',
                            response: 'No reports, No customer details',
                            customerDetails: {userId: req.body.customerId},
                            reportDetails: reportsinfo
                        })
                }

            });
        }
        else {

            return res.json({
                responseStatus: '4',
                response: 'An Error occurred',
                customerDetails: {userId: req.body.customerId}
            })
        }

    });

});
// router.post('/customerupdate',function (req,res,next) {
//     // console.log("inside customer update backend")
//
//     var userProfile = {
//         customerName : req.body.customerName,
//         userId : req.body.userId,
//         customerEmail : req.body.customerEmail,
//         gender:req.body.gender,
//         dateOfBirth:req.body.dateOfBirth,
//         area:req.body.area,
//         city:req.body.city,
//         phoneNumber:req.body.userId,
//         married:req.body.married,
//         occupation:req.body.occupation,
//         habits:req.body.habits,
//         medicalHistory:req.body.medicalHistory,
//         familyDoctor:req.body.familyDoctor,
//         doctorNumber:req.body.doctorNumber,
//         lastUpdated:Date.now()
//     };
//
//     // console.log(userProfile)
//     Userprofile.updateOne({"userId":req.body.userId},{$set:userProfile},function (err, userinfo) {
//         console.log(err)
//
//
//         if(err){
//             return res.json({
//                 title: 'An Error Occured',
//                 responseStatus:'1',
//                 error: err
//             });
//         }else{
//             res.json({
//                 response: 'Customer details updated',
//                 responseStatus: '0'
//             })
//         }
//     })
// });

router.post('/resetPassword',middlewareObj.isAdmin,function (req,res) {
    console.log(Date.now())

    Userauth.updateOne({userId:req.body.customerId},{$set:{password:req.body.newPassword , lastUpdated:Date.now()}},function(err,result) {
        // console.log(Date.now())

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

    Userauth.findOne({userId:req.body.userId,password:req.body.password},function (err,result1) {

        if(result1) {
            Userauth.updateOne({userId:req.body.userId,password:req.body.password},{$set:{password:req.body.newPassword , lastUpdated:Date.now()}},function(err,result) {
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

    Userauth.findOne({userId:req.body.customerId}, (err,userinfo) => {
        // var token = jwt.sign({user: userinfo}, 'secret', {expiresIn: 7200});

        if(userinfo) {
            // console.log(userinfo.validDate)
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

        // console.log(userinfo)
        if (!userinfo) {
            return res.json({
                title: 'An Error Occured',
                responseStatus:'1',
                error1: userinfo
            });
        }

        else {
            res.status(200).json({
                response: 'Customer details',
                responseStatus: '0',
                customerDetails:userinfo
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
    // console.log(req.body.userId)


    // Userprofile.findOneAndUpdate({userId:req.body.userId},req.body,{new:true},function (err, userinfo) {
    Userprofile.updateOne({userId:req.body.userId},{$set:userProfile},function (err, userinfo) {

        if(!userinfo){
            return res.json({
                title: 'An Error Occured',
                responseStatus:'1',
                error: err
            });
        }else{
            //update userauth also

            var userAuth = ({
                customerName:req.body.customerName,
                lastUpdated:Date.now()
            });
            console.log(req.body.userId)


            Userauth.updateOne({userId:req.body.userId},{$set:userAuth},function (err, result) {
                if (!result) {
                    return res.json({
                        response: 'An Error Occured..!',
                        responseStatus: '2',
                        error: err
                    });
                }
            })

            return res.json({
                response: 'Customer details updated',
                responseStatus: '0'
            })
        }
    })
});
module.exports = router;
