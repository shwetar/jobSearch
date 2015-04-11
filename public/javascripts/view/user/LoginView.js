'use strict';

var LoginView = Backbone.View.extend({
    el: $('#login-page'),

    events: {
        'click .signup-page-redirect': 'loadSignupPage'
    },
    
    loadSignupPage: function(){
      new SignupView();
    },
    
    initialize: function() {
      $(this.el).show();
    },
    
    render: function() {
      
    }
});


