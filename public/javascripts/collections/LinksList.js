'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var Link = require('../model/Link');

module.exports = Backbone.Collection.extend({
    model: Link
});