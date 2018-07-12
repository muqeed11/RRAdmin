var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Userauth = require('../models/userauth');

router.post('/signin', function (req, res, next){

    Userauth.findOne({userId:req.body.userId}, (err,userinfo) =>{

        console.log(req.body.userId)

        if(err){
            return res.status(500).json({
                response:'An Error Occured',
                error:err,
                responseStatus:'3'
            });
        }

        if(!userinfo) {
            // return res.status(401).json({
            return res.json({
                response:' Invalid User',
                responseStatus: '1'
            })
        }
        // if (!bcrypt.compareSync(req.body.password, password)) {
        if (!(req.body.password === userinfo.password)) {
            return res.json({
                response: 'Login failed',
                responseStatus: '2'
            });
        }
        // // var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

        res.status(200).json({
            response:'Login successful',
            customerName:userinfo.customerName,
            userId:userinfo.userId,
            token:'testtoken',
             responseStatus: '0'

        });
    });


    // res.redirect('/');

});

module.exports = router;
