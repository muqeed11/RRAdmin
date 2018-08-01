var express = require('express');
var router = express.Router();
var Reports = require('../models/reports');
var Userprofile = require('../models/userprofile');


router.post('/usercount',function (req,res,next) {
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

router.post('/reportscount',function (req,res,next) {

    Reports.aggregate([{$group:{_id:"$reportType",reportcount:{$sum:1}}}],function (err,result) {

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

})

module.exports = router;
