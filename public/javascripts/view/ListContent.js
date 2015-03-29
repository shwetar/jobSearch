'use strict';

var ListContent = Backbone.View.extend({
  el: $('.list-container'),
  // template 
  template: _.template($("#list-content-template").html()),
  
  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(this.template({
        child: this.collection
    }));
  }
});

var child1 = new Child({
  id: 1,
  name: "Edward Polyakov",
  parent: 1,
  links: ["http://www.friv.com"]
});

new ListContent({collection: child1.toJSON()});