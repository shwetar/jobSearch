var express = require('express');
var router = express.Router();
var userModel = require('../model/user');

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


module.exports = router;
