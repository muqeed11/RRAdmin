var express = require('express');
var router = express.Router();
var UserAuth = require('../models/userauth')

router.get('/', function (req, res, next){
    UserAuth.findOne({},function (err,doc) {
        if(err){
            return res.send('Error!')
        }
    });

    res.redirect('/');

});

module.exports = router;
