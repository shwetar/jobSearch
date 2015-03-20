var mongoskin = require('mongoskin');
//mongodb://<dbuser>:<dbpassword>@ds031571.mongolab.com:31571/olegdb
var db = mongoskin.db('mongodb://@localhost:27017/jobsdb',{safe:true});

//var db = mongoskin.db('mongodb://opolyo01:money01@ds031571.mongolab.com:31571/olegdb',{safe:true});

exports.newListing = function(req, cb){
    req.collection= db.collection('listings');
    console.log("Body", req.body);
    req.collection.insert(req.body,{},function(e,results){
        cb.call(this, e, results);
    });
};

/*exports.getAllListings = function(req, cb){
    req.collection=db.collection('listings');

    req.collection.find().toArray(function(e, results){
        cb.call(this, e, results);
    });
};*/

exports.getListings = function(location, title, req, cb){
    req.collection=db.collection('listings');
    console.log(title);
    //var title = req.query.title;
    console.log(location);
    //var location = req.query.location;
    if(title=="" && location ==""){
        req.collection.find().toArray(function(e, results){
        cb.call(this, e, results);
        });
    }
    else{    
    req.collection.find( {
        $or: [ { title: title, location: location }, { title: title}, {location: location } ] 
        },{_id:0} ).toArray(function(e,results){
        console.log(results);
        cb.call(this, e, results);
        
        });
    }
     /*   var arr = [{
        title: "title1",
        location: "location1",
        description: "description1"
      },{
        title: "title2",
        location: "location2",
        description: "description2"
    }];*/

    
};