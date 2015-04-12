'use strict';

var ContainerView = Backbone.View.extend({
    el: $("#container"),
    myChildView: null,
     
    render: function() {
     	this.$el.empty();
        this.$el.append(this.myChildView.$el); 
        return this;
    }
});
