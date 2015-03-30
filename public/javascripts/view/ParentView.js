'use strict';

var ParentView = Backbone.View.extend({
    tagName:  'li',
    template: _.template($("#parents-list-template").html()),

    initialize: function() {
        this.render();
    },
    render: function() {
      this.$el.html(this.template({item: this.model}));
      return this;
    }
});