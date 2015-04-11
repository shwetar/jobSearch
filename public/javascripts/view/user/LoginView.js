'use strict';

var LoginView = Backbone.View.extend({
    events: {
      'click #login': 'handleLogin'
    },
    template: _.template($("#login-template").html()),
    
    handleLogin: function(){
      var userName = this.$el.find(".username").val();
      var password = this.$el.find(".password").val();

      $.post("/api/users/login", {userName: userName, password: password}, function(resp){
        if(resp.success){
          window.location.hash = "home";
        }
        else{
          alert(resp);
        }
      });
    },

    initialize: function() {
      this.render();
    },
    
    render: function() {
      this.$el.html(this.template({}));
      return this;
    }
});


