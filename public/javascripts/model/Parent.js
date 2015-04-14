'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
    defaults : {
        id: "",
        email : '',
        name: '',
        city: '',
        children: []
    },
    idAttribute: "id",
    initialize: function () {
        
    },
    constructor: function (attributes, options) {
        console.log('Parent\'s constructor had been called');
        Backbone.Model.apply(this, arguments);
    },
    validate: function (attr) {
        if (attr.id <= 0) {
            return "Invalid value for ID supplied.";
        }
    }
});