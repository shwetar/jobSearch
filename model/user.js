'use strict';

var mongoskin = require('mongoskin');
//var db = mongoskin.db('mongodb://@localhost:27017/jobsdb',{safe:true});
var db = mongoskin.db('mongodb://opolyo01:money01@ds031571.mongolab.com:31571/olegdb',{safe:true});

exports.newUser = function(req, cb){
    req.collection= db.collection('users');
    console.log("Body", req.body);
    req.collection.insert(req.body,{},function(e,results){
        cb.call(this, e, results);
    });
};


exports.getUser = function(req, cb){
    req.collection= db.collection('users');
    req.collection.find({
        userName: req.body.userName,
        password: req.body.password
    }).toArray(function(e, results){
        cb.call(this, results);
    });
};