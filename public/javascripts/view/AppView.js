'use strict';

var AppView = Backbone.View.extend({
    el: $('body'),
    events: {
        //'click .add-link-button': 'addLink',
        'click .add-parent-button': 'addParent',
        //'submit #add-link-form': 'addLink'
    },

    initialize: function() {
        localStorage.setItem("parents",JSON.stringify([{"id":1,"name":"Test Orange"},{"id":2,"name":"Test Apple"}]));
        localStorage.setItem("children",JSON.stringify([{"id":1,"name":"Test Orange child1","parentID":1},{"id":2,"name":"Test orange child2","parentID":1},{"id":3,"name":"Test Apple child1","parentID":2},{"id":4,"name":"Test Apple child2","parentID":2}]));                
        this.render();
    },
    addParent: function(){

    },
    
    render: function() {
     
     var parents= JSON.parse(localStorage.getItem("parents")); 
     var parentCollection = new ParentList();
     
     _.each(parents, function(parent){
     
        parentCollection.push(new Parent(parent));
      });
     console.log("parentCollection"+parentCollection);
     // Change here for Person Views from App Views namespace
    var parentView = new ParentListView({ collection: parentCollection });
    $(".sidebar-container").append(parentView.render().el);

    }
});


new AppView();


//     var parentCollection = new ParentList([
//   {
//       name: 'Orange',
//       email: ""
//   },
//   {
//       name: 'Banana',
//       email:""
//   },
//   {
//       name: 'Mango',
//       email:""
//   }
// ]);
//[{"id":1,"name":"Test Stevenson","city":"Mountain View","children":[{"id":1,"name":"Edik Test","yourChild":true,"parent":1,"links":["http://www.friv.com"]},{"id":2,"name":"Maria Test","yourChild":true,"parent":1,"links":["http://www.stmath.com","http://www.sumdog.com"]}],"activeParent":true},{"id":2,"name":"John Smith","city":"San Jose","children":[{"id":3,"name":"Joseph","yourChild":false,"parent":2,"links":["http://www.linkedin.com"]},{"id":4,"name":"Veronika","yourChild":false,"parent":2,"links":["http://www.yahoo.com","http://www.google.com"]}],"activeParent":false},{"id":3,"name":"Test1","city":"San Jose","children":[],"activeParent":false},{"id":4,"name":"Test3","city":"San Jose","children":[],"activeParent":false}]