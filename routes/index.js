var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');

var db = mongoskin.db('mongodb://@localhost:27017/jobsdb',{safe:true});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET signup page. */
router.get('/signup', function(req, res) {
  res.render('signup',{ title: 'Signup Page' });
});

/* POST to Add User Service */
router.post('/signup', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var password = req.body.password;

    console.log("userName="+userName);
    console.log("password="+password);

    // Set our collection
    var collection = db.collection('users');
	console.log("1");

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "password" : password
    }, function (err, doc) {
        if (err) {
        	console.log("2");
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
        	console.log("3");
            // If it worked, set the header so the address bar doesn't still say /adduser
            //res.location("login");
            // And forward to success page
            //res.redirect("login");
        }
    });
    console.log("4");
});

/* GET search page. */
router.get('/search', function(req, res) {
  res.render('search',{ title: 'Search Page' });
});

/* GET post page. */
router.get('/post', function(req, res) {
  res.render('post',{ title: 'Post Page' });
});

module.exports = router;
