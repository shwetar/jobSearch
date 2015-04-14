'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var LoginView = require("./view/user/LoginView");
var SignupView = require("./view/user/SignupView");
var ContainerView = require("./view/ContainerView");
var HomeView = require("./view/home/HomeView");

module.exports = Backbone.Router.extend({
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
        this.home = new HomeView({el: $("#container")});
    },

    loginRoute: function () {
        this.login = new LoginView({el: $("#container")});
    },

    signupRoute: function () {
        this.signup = new SignupView({el: $("#container")});
    }
    
});
