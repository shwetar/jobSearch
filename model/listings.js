var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@localhost:27017/jobsdb',{safe:true});

exports.newListing = function(req, cb){
    req.collection= db.collection('listings');
    console.log("Body", req.body);
    req.collection.insert(req.body,{},function(e,results){
        cb.call(this, e, results);
    });
};


exports.getListings = function(location, title, req, cb){
    var arr = [{
        title: title,
        location: location,
        description: "desc"
      },{
        title: title+"2",
        location: location+2,
        description: "desc2222"
    }];

    cb.call(this, null, arr);
};