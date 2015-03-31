var mongoskin = require('mongoskin');
//mongodb://<dbuser>:<dbpassword>@ds031571.mongolab.com:31571/olegdb
var db = mongoskin.db('mongodb://@localhost:27017/olegdb',{safe:true});
//var db = mongoskin.db('mongodb://opolyo01:money01@ds031571.mongolab.com:31571/olegdb',{safe:true});

exports.newParent = function(req, cb){
    req.collection= db.collection('parents');
    console.log("Body", req.body);
    req.collection.insert(req.body,{},function(e,results){
        cb.call(this, e, results);
    });
};

exports.getAllParents = function(req, cb){
    req.collection=db.collection('parents');

    req.collection.find().toArray(function(e, results){
        delete results[0]._id;
        cb.call(this, e, results[0]);
    });
};
