var express = require("express");

var ensureAuthenticated = require("../auth/auth").ensureAuthenticated;

var Message = require("../models/message");

var User = require("../models/user");

let router = express.Router();

router.use(ensureAuthenticated);

router.get("/", function(req, res){
    Message.find({roomID:"room1"}).exec(function(err, messages){
        if(err){console.log(err);}
        res.render("message/messages", {messages:messages});
    });
 });

//  User.findOne({_id:req.user._id}).exec(function)

 router.post("/", function(req, res){
    User.findOne({_id:req.user._id}).exec(function(err,user){
        if(err){console.log(err);}
        var newMessage = new Message({
            content:req.body.content,
            userID:req.user._id,
            username:user.username,
            roomID:"room1"
        });
    
        newMessage.save(function(err,message){
            if(err){console.log(err);}
            res.redirect("/messages");
        });
    });
 });

module.exports = router;
