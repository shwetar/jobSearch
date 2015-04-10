'use strict';

var Header = Backbone.View.extend({
  el: $('.header-container'),
  // template 
  template: _.template($("#header-template").html()),
  
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.template({}));
  }
});

new Header();