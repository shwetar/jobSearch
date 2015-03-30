'use strict';

var ListContent = Backbone.View.extend({
  el: $('.list-container'),
  // template 
  template: _.template($("#list-content-template").html()),
  
  initialize: function(){
    if(this.model instanceof Backbone.Model){
      this.listenTo(this.model, "change", this.render);
    }
    this.render();
  },

  render: function(){
    var data = this.model;
    if(this.model instanceof Backbone.Model){
      data = this.model.toJSON();
    } 
    this.$el.html(this.template({
        child: data
    }));
  }
});