var express = require('express');
var router = express.Router();
var userModel = require('../model/user');

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
    userModel.newUser(req, function(e, results){
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
