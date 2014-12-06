var express = require('express');
var router = express.Router();
var listingsModel = require("../model/listings");

/* GET listings page. */
router.get('/', function(req, res) {
  res.render('listings',{ title: 'Listings Page' });
});

router.get('/search', function(req, res) {
  res.send([{
    title: "xyz",
    location: "abc",
    description: "desc"
  },{
    title: "xyz",
    location: "abc",
    description: "desc"
  }]);
});

router.post('/',function(req,res,next){
    listingsModel.newListing(req, function(e, results){
        console.log("Error", e);
        if(e) return next(e);
        res.send(results);
    });
});

module.exports = router;

