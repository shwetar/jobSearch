'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({
    events: {
      'click #signup': 'handleSignup'
    },
    template: require('../../templates/signup-page.html'),
    
    handleSignup: function(e){
      e.preventDefault();
      var fullName = this.$el.find("#fullName").val();
      var userName = this.$el.find("#inputEmail").val();
      var password = this.$el.find("#inputPassword").val();

      $.post("/api/users/signup", {userName: userName, password: password, fullName: fullName}, function(resp){
        if(resp.success){
          window.location.hash = "home";
        }
        else{
          console.error(resp);
        }
      });
    },

    initialize: function() {
      this.render();
    },
    
    render: function() {
      this.$el.html(this.template({}));
    }
});


