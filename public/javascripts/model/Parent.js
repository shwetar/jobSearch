'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
    defaults : {
        id: "",
        name : '',
        city: '',
        children: []
    },
    idAttribute: "id",
    initialize: function () {
        console.log('Parent has been intialized');

        // Lets hook up some event handers to listen to model change
        this.on('change', function () {
            if(this.hasChanged('children')){
                console.log('children has been changed');
            }
        });

        this.on("invalid", function (model, error) {
            console.log("Invalid Parent params passed: " + error);
        });
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