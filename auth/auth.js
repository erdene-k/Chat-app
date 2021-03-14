//middleware to check if user is logged in
var ensureAuth = function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = {ensureAuthenticated: ensureAuth}