var HeaderView = Backbone.View.extend({
    el: $('.header'),
    template: _.template($("#header-template").html()),

    events: {
        'click .add-link': 'addLink',
        'click .add-friend': 'addFriend'
    },
    
    addLink: function(e){
        console.log("add link");
    },

    addFriend: function(){
        console.log("add friend");
    },

    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template({}));
        return this;
    }
});


new HeaderView({});