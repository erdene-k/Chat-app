var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var setUpPassport = require("./setuppassport");
var Message = require("./models/message");

const DATABASECONNECTION = "mongodb+srv://khosoo:password210616@cluster0.ayucr.mongodb.net/database?retryWrites=true&w=majority"

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// var sockets = require("./sockets");
// sockets.socketServer(app, http);

mongoose.connect(DATABASECONNECTION, {useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true},
    function(err){
        if(err){
            console.log('Database not connected');
        }
        console.log('Database connected');
    });

setUpPassport();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"doemlfgddfsoi!gjdsf5684561dsf",
    resave:false,
    saveUninitialized:false
}));


// io.on('connection', (socket)=> {
//     socket.on('chat message', function(msg, user){
//         console.log(msg+"    "+user);
//         io.emit('chat message',msg)
//       });
// });

io.on('connection', (socket)=> {
    socket.on('chat message', function(msg, user){
        console.log(msg+"    "+user);
        io.emit('chat message',msg,user)
      });
});

// io.on('connection', (socket)=> {
//     socket.on('chat message', function(msg, user){
//         console.log(msg+"    "+user);
//         io.emit('chat message',msg)
//       });
// });

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use("/", require("./routes"));

http.listen(3000, function(){
    console.log("Server started on port 3000");
})
