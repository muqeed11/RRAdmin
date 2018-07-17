var express = require('express');
var router = express.Router();
var Messages = require('../models/message');

router.post('/messageToCustomer',function (req,res,next) {
    console.log(req.body.userId)
    console.log(req.body.messageSub)
    console.log(req.body.messageContent)

    var messages = new Messages({
        userId:req.body.userId,
        messageSub:req.body.messageSub,
        messageContent:req.body.messageContent,
        messageStatus:'U',
        createdDate : Date.now(),
        lastUpdated:Date.now()
    });

    messages.save(function (err,result) {

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

    console.log(req.body.userId)

    Messages.find({userId:req.body.userId},function (err,result) {

        if (err) {
            return res.json({
                title: 'An Error Occured',
                responseStatus:'1',
                error: err
            });
        }

        else {
            res.status(200).json({
                userId:req.body.userId,
                response: 'Messages',
                responseStatus:'0',
                Messages:result,
            });
        }


    })

})

module.exports = router;
