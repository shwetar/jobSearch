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
    req.collection= db.collection('users');

    // Get our form values. These rely on the "name" attributes
    // var userName = req.body.username;
    // var password = req.body.password;

    req.collection.insert(req.body,{},function(e,results){
        console.log("Error", e);
        if(e) return next(e);
        res.send(results);
    });
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
