var mongoose = require("mongoose");

var chatroomSchema = mongoose.Schema({
    name:{type:String,required:true}
});

var Chatroom = mongoose.model("Chatroom",chatroomSchema);

module.exports = Chatroom;