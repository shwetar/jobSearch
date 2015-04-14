'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var Parent = require('../model/Parent');

module.exports = Backbone.Collection.extend({
    model: Parent,
    initialize: function () {
        // This will be called when an item is added. pushed or unshifted
        this.on('add', function(model) {
            console.log('something got added');
            localStorage.setItem("parents", JSON.stringify(this.toJSON()));
            this.saveParentsCollection();
        });
        // This will be called when an item is removed, popped or shifted
        this.on('remove',  function(model) {
            console.log('something got removed');
            localStorage.setItem("parents", JSON.stringify(this.toJSON()));
            this.saveParentsCollection();
        });
        // This will be called when an item is updated
        this.on('change', function(model) {
            console.log('something got changed');
            localStorage.setItem("parents", JSON.stringify(this.toJSON()));
            this.saveParentsCollection();
        });
    },

    saveParentsCollection: function(){
        $.ajax({
            method: "POST",
            url: "/api/parents",
            cache: false,
            data: JSON.stringify(this),
            headers: {'Content-Type': "application/json"}
          })
          .done(function( resp ) {
              console.log(resp);
          })
          .fail(function( jqXHR, textStatus ) {
            console.error( "Request failed: " + textStatus );
          });
    }
});

