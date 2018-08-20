var express = require('express');
var router = express.Router();
var Reports = require('../models/reports');
var mkdirp = require('mkdirp');
var Userprofile = require('../models/userprofile');
var fs = require('fs');
var fse = require('fs-extra');
var PDFDocument = require('pdfkit');
var jwt = require('jsonwebtoken');


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

router.post('/showreportAdmin',function(req,res,next){

    console.log("inside showreport admin")
    Reports.findOne({_id:req.body.reportId},function (err,result) {

        // console.log(result)

        const reportPath = result.reportKey;
        const reportType1 = result.reportType;
        const reportId = result._id
        fs.readFile(reportPath,'base64',function (err,base64string) {
            if(!err)
            {
                return res.json({
                    reportFile:base64string,
                    responseStatus: '0',
                    reportType : reportType1,
                    reportId:reportId
                })
            }
            else {
                return res.json({
                    responseStatus: '1',
                    response: 'An Error Occurred while fetching one report'
                })
            }
        });
    })
});

router.post('/delreportAdmin',function(req,res,next){

    // console.log("inside delreport admin")
    // console.log(req.body.reportId )
    // console.log(req.body.reportReason )
    // console.log(req.body.reason)

        Reports.updateOne({"_id":req.body.reportId},{$set:{reportStatus:"Deleted",reportReason:req.body.reportReason,
                lastUpdated:Date.now()}},function (err1, result) {
            console.log(result)

            if (err1) {
                return res.status(500).json({
                    title: 'An Error Occured while saving data in reports table',
                    error: err1,
                    responseStatus:'1'
                });
            }

            else {
                return res.json({
                    reponseStatus:'0',
                    reportReason : req.body.reportReason

                })
            }
        });

});

router.post('/rejreportAdmin',function(req,res,next){

    console.log("inside rejreportAdmin  admin")
    // console.log(req.body.reportId )
    // console.log(req.body.reportReason )
    // console.log(req.body.reason)

    Reports.updateOne({"_id":req.body.reportId},{$set:{reportStatus:"Rejected",reportReason:req.body.reportReason,
            lastUpdated:Date.now()}},function (err1, result) {
        console.log(result)

        if (err1) {
            return res.status(500).json({
                title: 'An Error Occured while saving data in reports table',
                error: err1,
                responseStatus:'1'
            });
        }

        else {
            return res.json({
                reponseStatus:'0',
                reportReason : req.body.reportReason

            })
        }
    });

});

router.post('/approvereportAdmin',function(req,res,next){

    // console.log("inside delreport admin")
    // console.log(req.body.reportId )
    // console.log(req.body.reportReason )
    // console.log(req.body.reason)

    Reports.updateOne({"_id":req.body.reportId},{$set:{reportStatus:"Approved",reportReason:req.body.reportReason,
            lastUpdated:Date.now()}},function (err1, result) {
        console.log(result)

        if (err1) {
            return res.status(500).json({
                title: 'An Error Occured while saving data in reports table',
                error: err1,
                responseStatus:'1'
            });
        }

        else {
            return res.json({
                reponseStatus:'0',
                reportReason : req.body.reportReason

            })
        }
    });

});


module.exports = router;
