'use strict';

var LoginView = Backbone.View.extend({
    //el: $('#login-page'),
    template: _.template($("#login-template").html()),
    
    initialize: function() {
      this.render();
    },
    
    render: function() {
      this.$el.html(this.template({}));
      return this;
    }
});


