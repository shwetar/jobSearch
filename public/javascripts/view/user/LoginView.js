'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({
    events: {
      'click #login': 'handleLogin'
    },
    template: require('../../templates/login-page.html'),
    
    handleLogin: function(){
      var userName = this.$el.find(".username").val();
      var password = this.$el.find(".password").val();

      $.post("/api/users/login", {userName: userName, password: password}, function(resp){
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


