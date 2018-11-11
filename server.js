const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
var bodyParser=require('body-parser');

let users;
let count;
let chatRooms;
let messagesArray = [];

var app=express();
var api=require('./server/routes/api.js');


mongoose.connect("mongodb://abhi:abhipw1@ds139331.mlab.com:39331/hireme",{ useNewUrlParser: true, useCreateIndex: true});

var db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log('Connected to MongoDB');
});

users = db.collection("users"); // getting the users collection
    chatRooms = db.collection("chatRooms"); /* getting the chatRooms collection. 
                                                This collection would store chats in that room*/

app.use(express.static(path.join(__dirname,'dist/Hireme')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api',api);

app.get('*',function(req,res){
    res.sendFile('index.html', { root:path.join(__dirname, 'dist/Hireme')})
});

app.listen(4000,function(){
console.log("Listening on port 4000..")
});


// const io = socket.listen(server);

    /* 'connection' is a socket.io event that is triggered when a new connection is 
       made. Once a connection is made, callback is called. */
    // io.sockets.on('connection', (socket) => { /* socket object allows us to join specific clients 
    //                                             to chat rooms and also to catch
    //                                             and emit the events.*/
    //     // 'join event'
    //     socket.on('join', (data) => {          
    //         socket.join(data.room);
    //         chatRooms.find({}).toArray((err, rooms) => {
    //             if(err){
    //                 console.log(err);
    //                 return false;
    //             }
    //             count = 0;
    //             rooms.forEach((room) => {
    //                 if(room.name == data.room){
    //                     count++;
    //                 }
    //             });
    //             // Create the chatRoom if not already created
    //             if(count == 0) {
    //                 chatRooms.insert({ name: data.room, messages: [] }); 
    //             }
    //         });
    //     });
    //     // catching the message event
    //     socket.on('message', (data) => {
    //         // emitting the 'new message' event to the clients in that room
    //         io.in(data.room).emit('new message', {user: data.user, message: data.message});
    //         // save the message in the 'messages' array of that chat-room
    //         chatRooms.update({name: data.room}, { $push: { messages: { user: data.user, message: data.message } } }, (err, res) => {
    //             if(err) {
    //                 console.log(err);
    //                 return false;
    //             }
    //         });  
    //     });
    //     // Event when a client is typing
    //     socket.on('typing', (data) => {
    //         // Broadcasting to all the users except the one typing 
    //         socket.broadcast.in(data.room).emit('typing', {data: data, isTyping: true});
    //     });
    // });
