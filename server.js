const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
var bodyParser=require('body-parser');
var app=express();
var api=require('./server/routes/api.js');

//Database connection
mongoose.connect("mongodb://abhi:abhipw1@ds139331.mlab.com:39331/hireme",{ useNewUrlParser: true, useCreateIndex: true});

var db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log('Connected to MongoDB');
});

//Essentials
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

//Listening on port 4000 
var server = app.listen(4000,function(){
console.log("Listening on port 4000..")
});

//Using socket.io
var io = require('socket.io').listen(server);

io.on('connection', (socket)=>{
    console.log('New connection made to Socket');


socket.on('join', function(data){
    //joining
    socket.join(data.room);

    console.log(data.user + ' joined the room : ' + data.room);

    socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
  });

  socket.on('leave', function(data){
    
    console.log(data.user + 'left the room : ' + data.room);

    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

    socket.leave(data.room);
  });

  socket.on('message',function(data){

    io.in(data.room).emit('new message', {user:data.user, message:data.message});
  })
});
