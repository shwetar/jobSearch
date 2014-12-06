var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');

var db = mongoskin.db('mongodb://@localhost:27017/jobsdb',{safe:true});

/* GET login page. */
router.get('/', function(req, res) {
  res.render('login',{ title: 'Login Page' });
});

router.post('/',function(req,res,next){
	req.collection= db.collection('users');
	console.log("Body", req.body);
	req.collection.insert(req.body,{},function(e,results){
		console.log("Error", e);
		if(e) return next(e);
		res.send(results);
	});
});

module.exports = router;

