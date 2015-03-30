'use strict';

var AppView = Backbone.View.extend({
    el: $('body'),

    events: {
        'click .add-link-button': 'addLink',
        'click .add-friend-button': 'addFriend'
    },
    
    addLink: function(e){
      //Ideally Links would be a collection, so we don't have to do a set and could have simple add
      // Add on Model will not fire a change event, it only bubbles to collections
      var linkName = $(".link-name").val();
      var links = this.currentChild.get("links").concat(linkName);
      this.currentChild.set("links", links);
      console.log("added link", linkName);
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
          yourChild: true,
          parents: [1, 2],
          links: ["http://www.friv.com"]
        });

        var child2 = new Child({
          id: 2,
          name: "Maria Polyakov",
          yourChild: true,
          parent: 1,
          links: ["http://www.stmath.com", "http://www.sumdog.com"]
        });

        var child3 = new Child({
          id: 3,
          name: "Joseph",
          yourChild: false,
          parent: 2,
          links: ["http://www.linkedin.com"]
        });

        var child4 = new Child({
          id: 4,
          name: "Veronika",
          yourChild: false,
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

        this.currentChild = child1;

        new ParentListView({collection: this.parentsList});
        new ListContent({model: this.currentChild});
        return this;
    }
});


new AppView({});