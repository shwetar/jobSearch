'use strict';

var AppView = Backbone.View.extend({
    el: $('body'),

    events: {
        'click .add-link-button': 'addLink',
        'click .add-friend-button': 'addFriend',
        'submit #add-link-form': 'addLink'
    },
    
    addLink: function(e){
      //Ideally Links would be a collection, so we don't have to do a set and could have simple add
      // Add on Model will not fire a change event, it only bubbles to collections
      e.preventDefault();
      var linkName = $(".link-name").val();
      if(this.validateUrl(linkName)){
        var links = this.currentChild.get("links").concat(linkName);
        this.currentChild.set("links", links);
        console.log("added link", linkName);
      }
      else{
        $(".alert-error").addClass('in').removeClass('out').removeClass('hidden');
      }
    },

    validateUrl: function(value){
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    },

    addFriend: function(){
        console.log("added friend");
        
        var friend = new Parent({
            id: this.parentsList.length+1,
            name: $(".friend-name").val(),
            city: 'San Jose',
            children: []
        });
        console.log(friend);
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