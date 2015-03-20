var express = require('express');
var router = express.Router();
var listingsModel = require("../model/listings");


/* GET listings page. */
router.get('/', function(req, res) {
   //listingsModel.getAllListings(req, function(e, results){
    res.render('listings',{ title: 'Listings Page',listItems:""});
   //});
});


/* GET post page. */
router.get('/post', function(req, res) {
  res.render('post',{ title: 'Post Page' });
});


router.get('/search', function(req, res) {
    var location = req.query.location,
        title = req.query.title;
    
    listingsModel.getListings(location, title, req, function(e, results){
        console.log("This is in listings:::" );
        console.log(results);
        //res.redirect("/listings");
        res.send(results);
       //var jresult = JSON.stringify(results);
       //console.log(jresult);
       //res.render("/Users/shwetarao/node_projects/jobs/views/listings",{ title: 'Listings Page' ,listItems:results});
       //res.render("listings",{ title: 'Listings Page' ,listItems:results});
    });
});

/*router.post('/', function(req, res) {
    var location = req.param('location'),
        title = req.param('title');
       console.log('req.query.title'+req.query.title);
       console.log('req.body.title'+req.body.title);
       console.log('req.param(title)'+req.param('title')); 
    
    listingsModel.getListings(location, title, req, function(e, results){
        console.log("This is in listings:::" );
        console.log(results);
        //res.redirect("/listings");
        //res.send(results);
       //var jresult = JSON.stringify(results);
       //console.log(jresult);
       //res.render("/Users/shwetarao/node_projects/jobs/views/listings",{ title: 'Listings Page' ,listItems:results});
       res.render("listings",{ title: 'Listings Page' ,listItems:results});
    });
});*/




router.post('/post',function(req,res){
    console.log("In post:",req.body);
    listingsModel.newListing(req, function(e, results){
        console.log("Error", e);
        if(e) return next(e);
        res.send(results);
    });
});

module.exports = router;

