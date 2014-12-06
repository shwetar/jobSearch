var express = require('express');
var router = express.Router();
var listingsModel = require("model/listings");

/* GET login page. */
router.get('/', function(req, res) {
  res.render('login',{ title: 'Login Page' });
});

router.post('/',function(req,res,next){
    listingsModel.newListing(req, function(e, results){
        console.log("Error", e);
        if(e) return next(e);
        res.send(results);
    });
});

module.exports = router;

