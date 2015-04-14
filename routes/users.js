'use strict';

var express = require('express');
var router = express.Router();
var UserModel = require("../model/user");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


router.post('/login', function(req, res) {
    UserModel.getUser(req, function(resp){
        res.send({
            success: resp.length > 0
        });
    });
});

router.post('/signup', function(req, res) {
    UserModel.newUser(req, function(e, resp){
        console.log(resp);
        res.send({
            success: resp.length > 0
        });
    });
});

module.exports = router;
