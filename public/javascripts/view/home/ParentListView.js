'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var ParentList = require("../../collections/ParentList");
var HomeView = require('./HomeView');
var ListContent = require("./ListContent");
var ParentView = require('./ParentView');

module.exports = Backbone.View.extend({
  model: ParentList,

  initialize: function(){
    var self = this;
    this.listenTo(this.collection, "add", this.render);
    this.render();
  },
  render: function(){
    var self = this;
    self.$el.empty();
    this.collection.each(function(model) {
      var activeParent = model.id === 1;
      model.set("activeParent",activeParent);
      var parentView = new ParentView({model: model.toJSON()});
      self.$el.append(parentView.el);
    });
  }
});