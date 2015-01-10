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
    req.collection=db.collection('listings');
    console.log(title);
    //var title = req.query.title;
    console.log(location);
    //var location = req.query.location;
    req.collection.find( {
        $or: [ { title: title, location: location }, { title: title}, {location: location } ] 
        },{_id:0} ).toArray(function(e,results){
        console.log(results);
        cb.call(this, e, results);

    });
    
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