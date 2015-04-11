'use strict';

var ChildListView = Backbone.View.extend({
  tagName: 'ul',
  //template: _.template($("#parents-list-template").html()),
  render: function(){
      this.collection.each(function(child){
          var childView = new ChildView({ model: child });
          this.$el.append(childView.render().el); // calling render method manually..
      }, this);
      return this; // returning this for chaining..
  }
});

