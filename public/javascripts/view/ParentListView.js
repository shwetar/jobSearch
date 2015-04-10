'use strict';

var ParentListView = Backbone.View.extend({
  tagName: 'ul',
  className:'.parents-list',
  template: _.template($("#parents-list-template").html()),
  render: function(){
      this.collection.each(function(parent){
          var parentView = new ParentView({ model: parent });
          this.$el.append(parentView.render().el); // calling render method manually..
      }, this);
      return this; // returning this for chaining..
  }
});
