var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var fs = require('file-system');

var User = require('../modals/user');
var Project = require('../modals/project');



router.post('/', function (req, res) {
    var user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/login', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                success:false,
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                success:false,
                title: 'Login failed',
                error: {message: 'No such user'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                success:false,
                error: {message: 'Wrong Password'}
            });
        }
        var token = jwt.sign({user:user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            success:true,
            userId: user._id
        });
    });
});

router.post('/postproject', function (req, res) {
    var decode=jwt.verify(req.body.token,'secret');
    // var fileData = fs.readFile('req.body.file',  function (err) {
    //     if(err){
    //        console.log(err);
    //     }
    // });
    var project = new Project({
        title:req.body.title,
        description:req.body.description,
        // file: fileData,
        skills: req.body.skills,
        budget: req.body.budget,
        userid:decode.user._id
    });
    project.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                message: 'Error while saving project in database',
                error: err
            });
        }
        res.status(201).json({
            success:true,
            message: 'Project saved',
            obj: result
        });
    });
});

router.get('/getprojects/', function (req, res) {
    Project.find({}).exec((err,data)=>{
        if(err){
            return res.status(500).json({
                message: 'Error occurred while finding projects',
                error: err
            });
        }
        else{
            res.status(201).json({
                success:true,
                message: 'All Projects',
                projects: data
            }); 
        }
    })
});

router.get('/getoneproject/:id', function (req, res) {
    Project.findById(req.params.id).exec((err,data)=>{
        if(err){
            return res.status(500).json({
                message: 'An error occurred while finding one project',
                error: err
            });
        }
        else{
            res.status(201).json({
                success:true,
                message: 'One project',
                projects: data
            }); 
        }
    })
});

module.exports = router;