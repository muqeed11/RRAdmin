var express = require('express');
var router = express.Router();
var User = require('../models/User')

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('create')
});

router.post('/create',function (req, res,next) {
    // res.send(req.body);
    // const user = new User({
    //     username:req.body.username,
    //     // email:req.body.email,
    //     password:req.body.password
    // });

    User.findOne({username:req.body.username}, (err, existingUser) => {

        console.log(existingUser)
        if(err){
            // return next(err);
            return res.status(500).json({
                title:'An Error Occured',
                error:err,
            });
        }else if(existingUser){
            // return res.send("User with that email already exits");
            res.status(200).json({
                title:'Login successful'
                // userId: User._id

            });
        }
    else if(!existingUser){
        // return res.send("User with that email already exits");
        res.status(401).json({
            title:'Invalid user'

        });
    }

        // user.save((err,user) =>{
        //     if(err){
        //         res.send(err);
        //     }else{
        //         res.redirect('/')
        //     }
        // })
    });
});
router.get('/edit/:id',function (req, res, next) {

    User.findById({_id:req.params.id}, function(err, user){
        if(err){
            res.send('no user found');
        }else{
            res.render('edit',{user:user})
        }
    })
})

router.post('/edit/',function (req, res, next) {

    User.findOneAndUpdate({_id:req.body.id},req.body,{new:true},function (err, user) {
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/')
        }
    })
})

router.get('/delete/:id',function (req, res, next) {

    User.deleteOne({_id:req.params.id}, function(err, user){
        if(err){
            res.send('no user found');
        }else{
            res.redirect('/')
        }
    })
})
module.exports = router;
