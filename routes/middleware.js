var middlewareObj = {};

middlewareObj.isAdmin = function (req,res,next) {
    console.log(req)
    if (req.user == 'Admin') {
    console.log("user is admin")
        next()
}
    else {
        console.log("User is not admin")
        next()

    }

};

module.exports = middlewareObj;