  
var mongoose = require("mongoose");


var messageSchema = mongoose.Schema({
    content: {type:String, required:false},
    userID:{type:mongoose.Schema.Types.ObjectId, required:false, unique:false},
    username:{type:String, required:false},
    roomID:{type:String, required:false},
    date:{type:Date,required:false,default:Date.now}
    // public:{type:Boolean, default:false, required:false,unique:false}
});

var Message = mongoose.model("Message", messageSchema);

module.exports = Message;