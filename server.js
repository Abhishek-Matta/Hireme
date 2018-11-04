const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
var bodyParser=require('body-parser');

var app=express();
var api=require('./server/routes/api.js');


mongoose.connect("mongodb://abhi:abhipw1@ds139331.mlab.com:39331/hireme",{ useNewUrlParser: true, useCreateIndex: true});

var db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log('Connected to MongoDB');
});

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
