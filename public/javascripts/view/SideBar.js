'use strict';

var SideBar = Backbone.View.extend({
  el: $('.sidebar-container'),
  // template 
  template: _.template($("#sidebar-template").html()),
  events: {
    'click .child-links': 'childLinksSelected',
  },
  childLinksSelected: function(){

  },
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.template({}));
  }
});

new SideBar();