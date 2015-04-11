'use strict';

var AppView = Backbone.View.extend({
    el: $('body'),

    events: {
    },
    
    initialize: function() {
      // Give me the /user/info?  If not loggedin, then show login page
      var isUserLogedIn = false;
      if(!isUserLogedIn){
        new LoginView();
      }
      else{
        new SignupView();
      }
      //this.render();
    },
    
    render: function() {
      
    }
});


new AppView({});
