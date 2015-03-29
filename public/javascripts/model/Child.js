var Child = Backbone.Model.extend({
    defaults : {
        firstName : '',
        lastName: '',
        city: '',
        parents: [],
        links: []
    }
});