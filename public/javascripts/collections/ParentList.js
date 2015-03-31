'use strict';

var ParentList = Backbone.Collection.extend({
    model: Parent,
    initialize: function () {
    
        // This will be called when an item is added. pushed or unshifted
        this.on('add', function(model) {
            console.log('something got added');
            localStorage.setItem("parents", JSON.stringify(this.toJSON()));
        });
        // This will be called when an item is removed, popped or shifted
        this.on('remove',  function(model) {
            console.log('something got removed');
            localStorage.setItem("parents", JSON.stringify(this.toJSON()));
        });
        // This will be called when an item is updated
        this.on('change', function(model) {
            console.log('something got changed');
            localStorage.setItem("parents", JSON.stringify(this.toJSON()));
        });
    }
});