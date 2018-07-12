var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log('inside app.js');
    res.json('inside res json');
    // res.render('index');
});

module.exports = router;




// var express = require('express');
// var router = express.Router();
// var User = require('../models/userprofile')
//
// router.get('/', function (req, res, next){
//     User.findOne({},function (err,doc) {
//         if(err){
//             return res.send('Error!')
//         }
//         res.render('node',{email:doc.email});
// //
//     });
// });
//
//
// router.post('/', function (req, res, next) {
//     var email = req.body.email;
//     var user = new User({
//        firstname:'Muqeet',
//        lastname:'Ahmed',
//         password:'super-secret',
//         email:email
//     });
//
//     user.save();
//     res.redirect('/');
// });
//
// module.exports = router;
