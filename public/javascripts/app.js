'use strict';

var Backbone = require('backbone');
var Router = require('./Router.js');
var HeaderView = require('./view/layout/Header.js');
var header = new HeaderView({});

var router = new Router();
Backbone.history.start();