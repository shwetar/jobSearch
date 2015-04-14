'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var HeaderView = require('../layout/Header');

module.exports = Backbone.View.extend({
    events: {
      'click #login': 'handleLogin'
    },
    template: require('../../templates/login-page.html'),
    
    handleLogin: function(){
      var userName = this.$el.find("#inputEmail").val();
      var password = this.$el.find("#inputPassword").val();

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


