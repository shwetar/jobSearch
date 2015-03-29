var HeaderView = Backbone.View.extend({
    el: $('.header'),
    template: _.template($("#header-template").html()),
    
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template({}));
        return this;
    }
});


new HeaderView({});