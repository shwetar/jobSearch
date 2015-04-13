'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({
  template: require('../../templates/list-content.html'),
  
  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(this.template({
        child: this.model
    }));
  }
});