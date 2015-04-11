'use strict';

var HomeView = Backbone.View.extend({
    template: _.template($("#home-template").html()),

    events: {
        'click .add-link-button': 'addLink',
        'click .add-friend-button': 'addParent',
        'submit #add-link-form': 'addLink'
    },
    
    addLink: function(e){
      var self = this;
      e.preventDefault();
      var linkName = $(".link-name").val();
      if(this.validateUrl(linkName)){
        var links = this.currentChild.links.concat(linkName);
        this.currentChild.links = links;
        new ListContent({model: this.currentChild});
        _.each(this.currentParent.children, function(child){
          if(child.id === self.currentChild.id){
            self.currentChild.links = links;
          }
        });
        localStorage.setItem("parents", JSON.stringify(this.parentsList.toJSON()));
        console.log("added link", linkName);
      }
      else{
        $(".alert-error").addClass('in').removeClass('out').removeClass('hidden');
      }
    },

    addParent: function(){
      console.log("added friend");
      
      var friend = new Parent({
          id: this.parentsList.length+1,
          name: $(".friend-name").val(),
          city: 'San Jose',
          children: []
      });
      this.parentsList.add(friend);
      $('#addParent').modal('hide');
      localStorage.setItem("parents", JSON.stringify(this.parentsList.toJSON()));
    },

    initialize: function() {
      this.render();
    },
    
    render: function() {
      var self = this;
      this.$el.html(this.template({}));
      this.parentsList = new ParentList();
      var parents = localStorage.getItem("parents");
      if(_.isEmpty(parents)){
        $.get("/api/parents", function(parents){
          processData(parents);
        });
      }
      else{
        processData(JSON.parse(parents));
      }

      function processData(parents){
        _.each(parents, function(parent){
          if(!self.currentChild){
            self.currentChild = parent.children[0];
            self.currentParent = parent;
          }
          self.parentsList.push(new Parent(parent));
        });
        new ParentListView({collection: self.parentsList});
        new ListContent({model: self.currentChild});
        localStorage.setItem("parents", JSON.stringify(self.parentsList.toJSON()));
        return self;
      }
    },

    validateUrl: function(value){
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    },
});


var homeView = new HomeView({});
