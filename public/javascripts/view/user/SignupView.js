'use strict';

var SignupView = Backbone.View.extend({
    //el: $('#signup-page'),
    template: _.template($("#signup-template").html()),

    initialize: function() {
      this.render();
    },
    
    render: function() {
        this.$el.html(this.template({}));
        return this;
      
    }
});


