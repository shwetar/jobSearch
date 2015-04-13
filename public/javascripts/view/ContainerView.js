'use strict';
var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    el: $("#container"),
    myChildView: null,
     
    render: function() {
     	this.$el.empty();
        this.$el.append(this.myChildView.$el); 
        return this;
    }
});
