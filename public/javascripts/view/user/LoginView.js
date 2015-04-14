'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({
    events: {
      'click #login': 'handleLogin'
    },
    template: require('../../templates/login-page.html'),
    
    handleLogin: function(e){
      e.preventDefault();
      var userName = this.$el.find("#inputEmail").val();
      var password = this.$el.find("#inputPassword").val();
      $.ajax({
        method: "POST",
        url: "/api/users/login",
        cache: false,
        data: {userName: userName, password: password},
        dataType:"json"
      })
      .done(function( resp ) {
          if(resp.success){
            window.location.hash = "home";
          }
          else{
            $(".alert-error").addClass('in').removeClass('out').removeClass('hidden');
            console.error(resp);
          }
      })
      .fail(function( jqXHR, textStatus ) {
        $(".alert-error").addClass('in').removeClass('out').removeClass('hidden');
        console.error( "Request failed: " + textStatus );
      });
    },

    initialize: function() {
      this.render();
    },
    
    render: function() {
      this.$el.html(this.template({}));
    }
});


