var express = require('express');
var router = express.Router();
var parentsModel = require("../model/parents");

var parents = [{
    "id": 1,
    "name": "Test Stevenson",
    "city": "Mountain View",
    "children": [{
        "id": 1,
        "name": "Edik Test",
        "yourChild": true,
        "parent": 1,
        "links": ["http://www.friv.com"],
    }, {
        "id": 2,
        "name": "Maria Test",
        "yourChild": true,
        "parent": 1,
        "links": ["http://www.stmath.com", "http://www.sumdog.com"]
    }]
}, {
    "id": 2,
    "name": "John Smith",
    "city": "San Jose",
    "children": [{
        "id": 3,
        "name": "Joseph",
        "yourChild": false,
        "parent": 2,
        "links": ["http://www.linkedin.com"]
    }, {
        "id": 4,
        "name": "Veronika",
        "yourChild": false,
        "parent": 2,
        "links": ["http://www.yahoo.com", "http://www.google.com"]
    }]
}];
/* GET signup page. */
router.get('/', function(req, res) {
    // parentsModel.getAllParents(req, function(e, results){
    //     console.log(results);
    //     res.send(results);
    // });
    res.send(parents);
});


module.exports = router;