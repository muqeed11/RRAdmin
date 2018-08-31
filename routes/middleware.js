var middlewareObj = {};

middlewareObj.isAdmin = function (req,res,next) {
    if (req.decoded.user.customerRole == 'Admin') {
        next()
    }
    else {
        console.log("User is not admin" , req.decoded.customerRole)
        // res.status(401).json({
        res.json({
            response: 'you are not authorized',
            responseStatus:'99'
        });

    }

};

module.exports = middlewareObj;