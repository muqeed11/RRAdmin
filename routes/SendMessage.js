var express = require('express');
var router = express.Router();
var Messages = require('../models/message');
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

router.post('/messageToCustomer',middlewareObj.isAdmin,function (req,res,next) {


    var dte = new Date();
    dte.setTime(dte.getTime() - dte.getTimezoneOffset()*60*1000);


    var messages = new Messages({
        userId:req.body.customerId,
        messageSub:req.body.messageSub,
        messageContent:req.body.messageContent,
        messageStatus:'U',
        messageUpdatedBy:req.body.userId,
        createdDate : dte,
        lastUpdated:dte
    });

    messages.save(function (err,result) {

        // console.log(err)

        if(result) {
            return res.json({
                responseStatus:'0',
                response:'Message updated'
            })
        }

        else {
            return res.json({
                responseStatus:'1',
                response:'Error while updating message'
            })

        }

    })

});

router.post('/getMessageList',function (req,res,next) {

    var tempid = ""


    if(req.body.customerId != null)
         tempid = req.body.customerId
    else
          tempid = req.body.userId


    // console.log(ISODate(Date.now("YYYY-MM-DD")))
    Messages.find({$or:[{userId:tempid} ,{userId:"ALL"}], messageStatus:'U'},{_id:1,messageSub:1,createdDate:1} ,function (err,result) {

         // console.log(Date.now())

        // var nDate = new Date().toLocaleString('en-US', {
        //     timeZone: 'Asia/Calcutta'
        // });

        //  // console.log(result[0].createdDate.toLocaleString('en-US', {timeZone: 'Asia/Calcutta' }));
        // var dte = new Date(Date.now());
        // dte.setTime(dte.getTime()- dte.getTimezoneOffset()*60*1000);
        // console.log(dte.toLocaleDateString())
        // console.log(dte.toLocaleString())

        // console.log(result[0])
        // var dte2 = (result[0].createdDate.getTime() -
        //     result[0].createdDate.getTimezoneOffset()*60*1000);

        // console.log(dte3.toLocaleString())
        //
        // var dte3 = result[0].createdDate
        // dte3.setTime(dte3.getTime() - dte3.getTimezoneOffset()*60*1000);
        //
        // var dte3 = result[1].createdDate
        // dte3.setTime(dte3.getTime() - dte3.getTimezoneOffset()*60*1000);
        //
        // console.log(result)


        if (err) {
            return res.json({
                title: 'An Error Occured',
                responseStatus:'1',
                error: err
            });
        }

        else {
           return res.json({
                userId:tempid,
                response: 'Messages',
                responseStatus:'0',
                Messages:result
            });
        }


    })

});


router.post('/showMessage',function (req,res,next) {

    // console.log(req.body.msgid)

    Messages.find({_id:req.body.msgid},function (err,result) {

        if (err) {
            return res.json({
                title: 'An Error Occured',
                responseStatus:'1',
                error: err
            });
        }

        else {
           return res.json({
                userId:req.body.userId,
                response: 'Messages',
                responseStatus:'0',
                Message:result,
            });
        }


    })

})



router.post('/deleteMessage',function (req,res,next) {

    // console.log(req.body.userId)
    // console.log(req.body.msgid)

    Messages.updateOne({userId:req.body.userId , _id:req.body.msgid} , { $set:{messageStatus:'D',lastUpdated:Date.now()}} ,function (err,result) {

        if (err) {
            return res.json({
                title: 'An Error Occured while updating message table',
                responseStatus:'1',
                error: err
            });
        }

        else {
            res.status(200).json({
                userId:req.body.userId,
                response: 'Messages',
                responseStatus:'0'
            });
        }


    })

})


module.exports = router;
