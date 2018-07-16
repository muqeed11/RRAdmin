var express = require('express');
var router = express.Router();
var Userprofile = require('../models/userprofile');
var Userauth = require('../models/userauth');
var Reports = require('../models/reports');



router.post('/customerid',function(req,res,next){

    // console.log(req.body.userId);
    Userprofile.findOne({userId:req.body.userId},function (err1,customerinfo) {
            if(!err1)
            {
                Reports.find({userId:req.body.userId},function (err2,reportsinfo) {

                    if(!err2) {
                        return res.json({
                            responseStatus: '0',
                            customerDetails: customerinfo,
                            reportDetails : reportsinfo
                        })
                    }


                });

            }
            else {
                return res.json({
                    responseStatus: '1',
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
})

module.exports = router;
