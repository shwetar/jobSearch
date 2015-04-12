'use strict';

var ListContent = Backbone.View.extend({
  //el: $('.list-container'),
  // template 
  template: _.template($("#list-content-template").html()),
  
  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(this.template({
        child: this.model
    }));
  }
});