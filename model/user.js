var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@localhost:27017/jobsdb',{safe:true});

exports.newUser = function(req, cb){
    req.collection= db.collection('users');
    console.log("Body", req.body);
    req.collection.insert(req.body,{},function(e,results){
        cb.call(this, e, results);
    });
};


exports.getUser = function(req){
    req.collection= db.collection('listings');
    req.collection.insert(req.body,{},function(e,results){
        console.log("Error", e);
        if(e) return next(e);
        res.send(results);
    });
};