'use strict';
var myRouter = Backbone.Router.extend({
    
    
    login: null,
    signup: null,
    home: null,
    container:null,
    
    initialize: function() {
        this.container = new ContainerView();
     },

    routes: {
        "": "loginRoute",
        "login": "loginRoute",
        "signup": "signupRoute",
        "home": "homeRoute"
    },

    homeRoute: function(){
        if (this.home == null) {
            this.home = new HomeView({el: $("#container")});
        }
    },

    loginRoute: function () {
        if (this.login == null) {
            this.login = new LoginView({el: $("#container")});
        }
        this.container.myChildView = this.login;
        this.container.render();
    },

    signupRoute: function () {
        if (this.signup == null) {
            this.signup = new SignupView({el: $("#container")});
        }

        this.container.myChildView = this.signup;
        this.container.render();
    }

    
});


var router = new myRouter();
Backbone.history.start();