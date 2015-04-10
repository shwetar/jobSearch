'use strict'
var ChildView = Backbone.View.extend({
	tagName:'li',
	template: _.template($("#child-template").html()),
	render: function(){
      console.log(this.model.toJSON());
      this.$el.html( this.template(this.model.toJSON()));
      return this;  
  }
});
