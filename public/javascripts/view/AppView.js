'use strict';

var AppView = Backbone.View.extend({
    el: $('body'),

    events: {
        'click .add-link-button': 'addLink',
        'click .add-friend-button': 'addFriend'
    },
    
    addLink: function(e){
        console.log("added link");
        $('#addLink').modal('hide');
    },

    addFriend: function(){
        console.log("added friend");
        var friend = new Parent({id: this.parentsList.length+1,
              name: $(".friend-name").val(),
              city: 'San Jose',
              children: []});
        this.parentsList.add(friend);
        $('#addFriend').modal('hide');
    },

    initialize: function() {
        this.render();
    },
    
    render: function() {
        var child1 = new Child({
          id: 1,
          name: "Edward Polyakov",
          parents: [1, 2],
          links: ["http://www.friv.com"]
        });

        var child2 = new Child({
          id: 2,
          name: "Maria Polyakov",
          parent: 1,
          links: ["http://www.stmath.com", "http://www.sumdog.com"]
        });

        var child3 = new Child({
          id: 3,
          name: "Joseph",
          parent: 2,
          links: ["http://www.linkedin.com"]
        });

        var child4 = new Child({
          id: 4,
          name: "Veronika",
          parent: 2,
          links: ["http://www.yahoo.com", "http://www.google.com"]
        });

        this.parentsList = new ParentList([
            new Parent({
              id: 1,
              name: 'Oleg Polyakov/Antonina Trachuk',
              city: 'Mountain View',
              children: [child1, child2]
            }),
            new Parent({
              id: 2,
              name: 'John Smith',
              city: 'San Jose',
              children: [child3, child4]
            })
        ]);

        new ParentListView({collection: this.parentsList});
        new ListContent({collection: child1.toJSON()});
        return this;
    }
});


new AppView({});