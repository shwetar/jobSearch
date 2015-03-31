var Child = Backbone.Model.extend({
    defaults : {
        id: "",
        firstName : '',
        lastName: '',
        city: '',
        yourChild: false,
        parents: [],
        links: []
    },
    idAttribute: "id",
    initialize: function () {
        // This will be called when an item is added. pushed or unshifted
        this.on('add', function(model) {
            console.log('something got added to child');
        });
        // This will be called when an item is removed, popped or shifted
        this.on('remove',  function(model) {
            console.log('something got removed from child');
        });
        // This will be called when an item is updated
        this.on('change', function(model) {
            console.log('something got changed in child');
        });
    },
    validate: function (attr) {
        if (attr.id <= 0) {
            return "Invalid value for ID supplied.";
        }
    }

});