### Installations

```
$ npm install
```

### Run

```
Locally
$ npm run devStart
//To auto compile static resources
$ webpack --progress --colors --watch
Heroku
$ npm start
$ node ./bin/www
http://localhost:3000
https://shielded-gorge-5402.herokuapp.com
```

###Debugging

http://www.100percentjs.com/best-way-debug-node-js/
curl -X POST -d "title=Some cool Job&Location=San Jose&Description=Love this cool job" http://localhost:3000/listings

#Tutorials
http://www.codeproject.com/Articles/801863/BackBone-Tutorial-Part-Understanding-Backbone-js-V
http://getbootstrap.com/components/#list-group
http://addyosmani.github.io/backbone-fundamentals/#introduction


###Heroku Deployment

$ heroku login
$ heroku git:remote -a shielded-gorge-5402
//Do local commits to your repo git add -A, git commit -m "" stuff
$ git push heroku favLinksOleg:master


If you cannot pull to the local branch
$ git branch --set-upstream-to origin/favLinksOleg

If you want to remove an app
$ heroku apps:destroy –app appname

$ heroku logs


Other Git Goodies:

git reset --hard origin/dev/reskin-latest
git merge-base head develop
git reset --soft c4762f39852553882f22cbebaea0d028f12ef745
git status
git commit -m "blah ...."
git log
git rebase origin/develop
git diff develop
git push -f origin head
git commit —amend


### To Run with MongoDB

You can temp insert mock data into db
$ mongod
$ mongo
$ use olegdb
$ db.parents.insert([{
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
}]);