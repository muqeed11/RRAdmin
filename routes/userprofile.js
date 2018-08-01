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
                    token:'testtoken',
                    responseStatus: '0'
                });


            })
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
                    token: 'testtoken',
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
