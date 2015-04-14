'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var LoginView = require("./view/user/LoginView");
var SignupView = require("./view/user/SignupView");
var ContainerView = require("./view/ContainerView");
var HomeView = require("./view/home/HomeView");
var HeaderView = require('./view/layout/Header.js');

module.exports = Backbone.Router.extend({
    login: null,
    signup: null,
    home: null,
    container:null,
    
    initialize: function() { 
        this.container = new ContainerView();
     },

    routes: {
        "login": "loginRoute",
        "signup": "signupRoute",
        "home": "homeRoute",
        '*path': "loginRoute"
    },

    homeRoute: function(){
        var header = new HeaderView({model: {
              loggedIn: true
        }});
        
        this.home = new HomeView({el: $("#container")});
    },

    loginRoute: function () {
        this.login = new LoginView({el: $("#container")});
        var header = new HeaderView({model: {
              loggedIn: false
        }});
    },

    signupRoute: function(){
        this.login = new SignupView({el: $("#container")});
        var header = new HeaderView({model: {
              loggedIn: false
        }});
    }
    
});
