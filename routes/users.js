var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


router.post('/login', function(req, res) {
    //UserModel.find({username: userName, password: password}) ==> true/false
    console.log(req.body.userName, req.body.password);
      res.send({
        success: true
      });
});

module.exports = router;
