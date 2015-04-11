'use strict';

var SignupView = Backbone.View.extend({
    el: $('#signup-page'),

    events: {
        'click .login-page-redirect': 'loadLoginPage'
    },
    
    loadLoginPage: function(){

    },
    
    initialize: function() {
      $(this.el).show();
    },
    
    render: function() {
      
    }
});


